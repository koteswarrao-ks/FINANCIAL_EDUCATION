import requests
import json
import os
from dotenv import load_dotenv
# Use agno_mock for compatibility (agno 2.3.2 has different API)
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from agno_mock import Agent

# Fix langchain version compatibility issues
try:
    import langchain
    if not hasattr(langchain, 'debug'):
        langchain.debug = False
    if not hasattr(langchain, 'verbose'):
        langchain.verbose = False
    if not hasattr(langchain, 'llm_cache'):
        langchain.llm_cache = None
except ImportError:
    pass

# Import LLM with error handling for version conflicts
try:
    from langchain_openai import AzureChatOpenAI
except ImportError:
    # Fallback if langchain-openai has version issues
    AzureChatOpenAI = None

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings  # Local embeddings - no API calls
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.documents import Document

# Load env
base_path = os.path.dirname(os.path.dirname(__file__))
dotenv_path = os.path.join(base_path, ".env")
load_dotenv(dotenv_path)

MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")

# === Load vector DB with LOCAL embeddings (semantic search without API calls) ===
# Using HuggingFace embeddings for true semantic search without OpenAI dependency
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",  # Lightweight, fast, semantic embeddings
    model_kwargs={'device': 'cpu'}  # Use CPU (change to 'cuda' if GPU available)
)
vectordb = Chroma(
    embedding_function=embeddings,
    persist_directory=os.path.join(base_path, "chroma_store"),
    collection_name="financial_concepts"
)

# Configure retriever for semantic search (similarity search, not keyword)
retriever = vectordb.as_retriever(
    search_type="similarity",  # Use semantic similarity, not keyword matching
    search_kwargs={"k": 5}  # Retrieve top 5 most semantically similar documents
)

def profile_agent_fn(child_id: str) -> dict:
    """
    Profile agent using TRUE RAG (semantic search + LLM).
    """

    # 1️⃣ Fetch data from MCP
    resp = requests.get(f"{MCP_SERVER_URL}/user_profile/{child_id}", timeout=5)
    resp.raise_for_status()
    data = resp.json()

    transactions = data.get("transactions", [])
    basic = data.get("basicProfile", {})
    transactions_text = json.dumps(transactions, indent=2)

    # 2️⃣ Semantic search from vector DB (TRUE semantic similarity, not keyword matching)
    # Build semantic query from transaction data (use ALL transactions for better context)
    all_categories = [txn.get('category', '') for txn in transactions if txn.get('category')]
    unique_categories = list(set(all_categories))  # Get unique categories
    transaction_summary = f"Child transactions: {', '.join(unique_categories)}" if unique_categories else "No transaction categories available"
    semantic_query = f"""
    Analyze child spending patterns and interests from transaction data.
    Identify hobbies, learning preferences, educational interests, and financial behaviors.
    Transaction context: {transaction_summary} (Total transactions: {len(transactions)})
    """
    
    try:
        # This uses embeddings for semantic similarity search, NOT keyword matching
        retrieved_docs = retriever.invoke(semantic_query)
        rag_context = "\n\n".join([doc.page_content for doc in retrieved_docs])
        if not rag_context:
            rag_context = "No relevant financial education concepts found in knowledge base."
    except Exception as e:
        # If semantic search fails, raise error - no keyword fallback
        raise RuntimeError(f"Semantic RAG retrieval failed: {type(e).__name__}: {str(e)}") from e

    # 3️⃣ Prompt - Enhanced to ensure LLM analyzes transaction data properly
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert child financial education analyst. You MUST analyze transaction data carefully and infer hobbies and favorite subjects. Always return VALID JSON with no explanation text."),
        ("human", """
You are analyzing a child's spending transactions to understand their hobbies and favorite subjects.

CRITICAL INSTRUCTIONS:
1. You MUST examine EVERY transaction in the data below
2. For HOBBIES: Look for transactions with categories like:
   - "Sports" → hobby: "Sports" or specific sport name (Football, Cricket, etc.)
   - "Art Supplies" → hobby: "Art" or "Drawing" or "Painting"
   - "Music" → hobby: "Music" or specific instrument
   - "Games & Toys" → hobby: "Gaming" or "Puzzles" or "Toys"
   - "Entertainment" → hobby: "Movies" or "Entertainment"
   - Merchant names like "Sports Store", "Music Academy", "Art Supplies Store" also indicate hobbies
   - Transaction descriptions like "Football", "Guitar Strings", "Watercolor Paint" indicate hobbies

3. For FAVORITE SUBJECTS: Look for transactions with:
   - "Books" category → Check description for subject: "Science Books" → "Science", "Math Books" → "Mathematics"
   - "Educational App" → Check description: "Math Learning Module" → "Mathematics"
   - "Digital Books" → Check description: "Science Experiments" → "Science"
   - Merchant names like "BookStore", "BookWorld" with descriptions indicating subjects
   - Transaction descriptions mentioning subjects: "Science Books", "Math Books", "Fun with Math" → infer subjects

4. You MUST return at least 1-2 hobbies and 1-2 favorite subjects based on the transactions
5. If you see multiple transactions in the same category, that's a strong indicator
6. Do NOT return empty arrays - you MUST analyze and infer from the data

### Transaction Data (JSON format):
{transactions}

### Relevant Financial Education Knowledge (RAG):
{rag}

### Analysis Steps:
1. Read through ALL transactions
2. Identify transaction categories and descriptions
3. Map categories/descriptions to hobbies (Sports, Art, Music, Gaming, etc.)
4. Map book/educational transactions to favorite subjects (Mathematics, Science, English, etc.)
5. Infer learning style from transaction patterns using these rules:
   - VISUAL: If transactions include "Art Supplies", "Drawing", "Painting", "Visual", "Video", "YouTube", "Photos", "Images" → visual
   - AUDITORY: If transactions include "Music", "Audio", "Podcast", "Music Lessons", "Guitar", "Piano" → auditory
   - KINESTHETIC: If transactions include "Sports", "Physical", "Games & Toys", "Building Blocks", "Hands-on", "Craft" → kinesthetic
   - READING/WRITING: If transactions include "Books", "Writing", "Stationery", "Notebook", "Pen", "Reading" → reading/writing
   - Default to "visual" if no clear pattern
6. Extract pocket money amount and frequency from Income transactions

### Example Analysis:
If transactions include:
- "Sports Store", "Football" → Hobby: "Football"
- "BookStore", "Science Books" → Subject: "Science"
- "Art Supplies Store", "Watercolor Paint" → Hobby: "Art"
- "Educational App", "Math Learning Module" → Subject: "Mathematics"

Return JSON EXACTLY in this format (fill in based on actual transaction analysis):
{{
  "hobbies": ["analyze and list actual hobbies from transactions"],
  "favoriteSubjects": ["analyze and list actual subjects from transactions"],
  "preferredLearningStyle": "infer using rules: Art/Visual items → visual, Music/Audio → auditory, Sports/Physical → kinesthetic, Books/Writing → reading/writing. Default to visual if unclear.",
  "pocketMoney": {{ 
    "frequency": "extract from Income transaction (weekly, monthly, etc.)",
    "amount": extract_amount_from_income_transaction,
    "currency": "INR or currency from transaction"
  }}
}}
""")
    ])

    # 4️⃣ Execute chain with LLM (semantic understanding, not keyword matching)
    if AzureChatOpenAI is None:
        raise RuntimeError("AzureChatOpenAI not available - check langchain-openai installation")
    
    # Azure OpenAI configuration
    azure_openai_api_key = os.getenv("AZURE_OPENAI_API_KEY")
    azure_openai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
    azure_openai_api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-15-preview")
    azure_openai_deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME", "gpt-4o-mini")
    
    # Validate required configuration
    if not azure_openai_api_key:
        raise ValueError("AZURE_OPENAI_API_KEY must be set in environment variables")
    if not azure_openai_endpoint:
        raise ValueError("AZURE_OPENAI_ENDPOINT must be set in environment variables")
    if not azure_openai_deployment:
        raise ValueError("AZURE_OPENAI_DEPLOYMENT_NAME must be set in environment variables")
    
    # Normalize endpoint URL (remove trailing slash if present, ensure https)
    if azure_openai_endpoint:
        azure_openai_endpoint = azure_openai_endpoint.rstrip('/')
        if not azure_openai_endpoint.startswith("http"):
            azure_openai_endpoint = f"https://{azure_openai_endpoint}"
    
    print(f"Profile Agent: Using Azure OpenAI endpoint: {azure_openai_endpoint}, deployment: {azure_openai_deployment}")
    
    # Capture prompt for LLM call details (before the try block so we can use it in error handling)
    formatted_prompt = prompt.format_messages(
        transactions=transactions_text,
        rag=rag_context
    )
    prompt_text = "\n".join([msg.content for msg in formatted_prompt if hasattr(msg, 'content')])
    
    from datetime import datetime
    llm_call_details = {
        "agent": "Profile Agent",
        "timestamp": datetime.now().isoformat(),
        "input": {
            "child_id": child_id,
            "transaction_count": len(transactions),
            "transaction_categories": list(set([txn.get("category", "") for txn in transactions if txn.get("category")])),
            "prompt": prompt_text[:1000] + "..." if len(prompt_text) > 1000 else prompt_text,
            "rag_context_length": len(rag_context)
        },
        "output": None,
        "reasoning": None,
        "error": None
    }
    
    try:
        model = AzureChatOpenAI(
            azure_deployment=azure_openai_deployment,
            azure_endpoint=azure_openai_endpoint,
            api_key=azure_openai_api_key,
            api_version=azure_openai_api_version,
            timeout=120,  # Increased to 120 seconds for slower connections
            max_retries=2  # Reduced retries since we have manual retry logic
            # Note: temperature parameter removed - Azure OpenAI model only supports default value
        )
        parser = JsonOutputParser()
        chain = prompt | model | parser
        
        # Invoke chain with retry logic
        import time
        max_attempts = 2  # Reduced total attempts to avoid long waits
        last_error = None
        result = None
        
        for attempt in range(max_attempts):
            try:
                print(f"Profile Agent: LLM call attempt {attempt + 1}/{max_attempts}")
                result = chain.invoke({
                    "transactions": transactions_text,
                    "rag": rag_context
                })
                print(f"Profile Agent: LLM call successful")
                break  # Success, exit retry loop
            except Exception as e:
                last_error = e
                error_type = type(e).__name__
                error_msg = str(e)
                
                # Log the attempt
                print(f"Profile Agent LLM call attempt {attempt + 1}/{max_attempts} failed: {error_type}: {error_msg}")
                
                # Store error in LLM call details
                llm_call_details["error"] = {
                    "attempt": attempt + 1,
                    "error_type": error_type,
                    "error_message": error_msg,
                    "endpoint": azure_openai_endpoint,
                    "deployment": azure_openai_deployment
                }
                
                # If it's a connection/timeout error and we have retries left, wait and retry
                if attempt < max_attempts - 1 and ("Connection" in error_type or "timeout" in error_msg.lower() or "APIConnectionError" in error_type or "Timeout" in error_type):
                    wait_time = 3  # Fixed 3 second wait between retries
                    print(f"Retrying in {wait_time} seconds...")
                    time.sleep(wait_time)
                else:
                    # No more retries or non-retryable error
                    raise
        
        if result is None:
            raise last_error if last_error else RuntimeError("LLM call failed with no result")
        
        # Update LLM call details with successful result
        llm_call_details["output"] = result
        llm_call_details["reasoning"] = {
            "hobbies_inferred": result.get("hobbies", []),
            "subjects_inferred": result.get("favoriteSubjects", []),
            "learning_style": result.get("preferredLearningStyle", ""),
            "pocket_money": result.get("pocketMoney", {})
        }
        llm_call_details["error"] = None  # Clear error on success
    except Exception as e:
        # Update LLM call details with final error
        error_type = type(e).__name__
        error_msg = str(e)
        
        if not llm_call_details.get("error"):
            llm_call_details["error"] = {
                "error_type": error_type,
                "error_message": error_msg,
                "endpoint": azure_openai_endpoint,
                "deployment": azure_openai_deployment
            }
        
        # Return profile data with error details so UI can show them
        # This allows the LLM panel to display error information
        profile_data = {
            "childId": data.get("childId"),
            "name": basic.get("name"),
            "age": basic.get("age"),
            "grade": basic.get("grade"),
            "country": basic.get("country"),
            "personalization": {
                "hobbies": [],
                "favoriteSubjects": [],
                "preferredLearningStyle": "unknown",
                "pocketMoney": {
                    "frequency": "unknown",
                    "amount": 0,
                    "currency": "INR"
                }
            }
        }
        
        # Return profile with LLM call details (including error) so UI can display it
        # Don't raise exception - let API handle the error response
        return {
            "profile": profile_data,
            "llm_call_details": llm_call_details
        }

    # 4.5️⃣ Validate LLM results - ensure it analyzed the data
    # If LLM returns empty arrays, log warning but keep the empty arrays
    # The LLM should have analyzed the data properly with the enhanced prompt
    if not result.get("hobbies") and not result.get("favoriteSubjects"):
        print(f"Warning: LLM returned empty hobbies and subjects for {child_id}. Transaction count: {len(transactions)}")
        # Log transaction categories for debugging
        categories = [txn.get("category", "") for txn in transactions if txn.get("category")]
        print(f"Transaction categories found: {list(set(categories))}")

    # 5️⃣ Merge with user preferences (if any)
    try:
        preferences_resp = requests.get(f"{MCP_SERVER_URL}/profile_preferences/{child_id}", timeout=5)
        if preferences_resp.status_code == 200:
            preferences = preferences_resp.json()
            # Only use saved preferences if they are NOT empty (user has edited them)
            # If saved preferences are empty, use LLM-inferred values
            saved_hobbies = preferences.get("hobbies", [])
            saved_subjects = preferences.get("favoriteSubjects", [])
            
            if saved_hobbies:  # Only override if user has actually set hobbies
                result["hobbies"] = saved_hobbies
            if saved_subjects:  # Only override if user has actually set subjects
                result["favoriteSubjects"] = saved_subjects
    except Exception as e:
        # If preferences don't exist or fetch fails, use analyzed values
        print(f"Warning: Could not fetch user preferences for {child_id}: {e}")
        pass
    
    # 6️⃣ Final personalization output
    profile_data = {
        "childId": data.get("childId"),
        "name": basic.get("name"),
        "age": basic.get("age"),
        "grade": basic.get("grade"),
        "country": basic.get("country"),
        "personalization": result
    }
    
    # Attach LLM call details if available (defined in try block above)
    if 'llm_call_details' in locals():
        return {
            "profile": profile_data,
            "llm_call_details": llm_call_details
        }
    
    return profile_data

# AGNO agent wrapper
profile_agent = Agent(func=profile_agent_fn, name="ProfileContextAgent")
