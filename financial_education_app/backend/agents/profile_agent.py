"""
Profile Agent using Agno framework (no LangChain)

This is the refactored version using Agno Agent and Agno tools.
"""

import json
import os
from dotenv import load_dotenv
from datetime import datetime
from openai import AzureOpenAI

# Import Agno tools (use entrypoint to call underlying functions)
from agents.agno_tools import (
    get_user_profile,
    retrieve_financial_concepts,
    get_profile_preferences
)

# Helper to call Agno tools
def call_agno_tool(tool, **kwargs):
    """Helper to call Agno tool via entrypoint"""
    return tool.entrypoint(**kwargs)

# Load env
base_path = os.path.dirname(os.path.dirname(__file__))
dotenv_path = os.path.join(base_path, ".env")
load_dotenv(dotenv_path)

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

# Normalize endpoint URL
if azure_openai_endpoint:
    azure_openai_endpoint = azure_openai_endpoint.rstrip('/')
    if not azure_openai_endpoint.startswith("http"):
        azure_openai_endpoint = f"https://{azure_openai_endpoint}"

# Create Azure OpenAI client
azure_client = AzureOpenAI(
    api_key=azure_openai_api_key,
    api_version=azure_openai_api_version,
    azure_endpoint=azure_openai_endpoint,
    timeout=120.0,
    max_retries=2
)

def profile_agent_fn(child_id: str) -> dict:
    """
    Profile agent using Agno tools for MCP operations and RAG retrieval.
    Uses Agno Agent for LLM calls.
    """

    # 1️⃣ Fetch data from MCP using Agno tool
    data = call_agno_tool(get_user_profile, child_id=child_id)
    
    if "error" in data:
        raise RuntimeError(f"Failed to fetch user profile: {data['error']}")
    
    transactions = data.get("transactions", [])
    basic = data.get("basicProfile", {})
    transactions_text = json.dumps(transactions, indent=2)

    # 2️⃣ Semantic search from vector DB using Agno RAG tool
    all_categories = [txn.get('category', '') for txn in transactions if txn.get('category')]
    unique_categories = list(set(all_categories))
    transaction_summary = f"Child transactions: {', '.join(unique_categories)}" if unique_categories else "No transaction categories available"
    semantic_query = f"""
    Analyze child spending patterns and interests from transaction data.
    Identify hobbies, learning preferences, educational interests, and financial behaviors.
    Transaction context: {transaction_summary} (Total transactions: {len(transactions)})
    """
    
    try:
        # Use Agno RAG tool for semantic search
        retrieved_docs = call_agno_tool(retrieve_financial_concepts, query=semantic_query, k=5)
        
        # Handle tool response format
        if retrieved_docs and isinstance(retrieved_docs, list) and len(retrieved_docs) > 0:
            if "error" in retrieved_docs[0]:
                raise RuntimeError(f"RAG retrieval failed: {retrieved_docs[0]['error']}")
            rag_context = "\n\n".join([doc.get("content", "") for doc in retrieved_docs])
        else:
            rag_context = "No relevant financial education concepts found in knowledge base."
        
        if not rag_context:
            rag_context = "No relevant financial education concepts found in knowledge base."
    except Exception as e:
        raise RuntimeError(f"Semantic RAG retrieval failed: {type(e).__name__}: {str(e)}") from e

    # 3️⃣ Create Agno Agent for LLM analysis
    system_prompt = """You are an expert child financial education analyst. You MUST analyze transaction data carefully and infer hobbies and favorite subjects. Always return VALID JSON with no explanation text."""

    user_prompt = f"""
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
{transactions_text}

### Relevant Financial Education Knowledge (RAG):
{rag_context}

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
"""

    # Capture prompt for LLM call details
    full_prompt = f"System: {system_prompt}\n\nUser: {user_prompt}"
    llm_call_details = {
        "agent": "Profile Agent (Agno)",
        "timestamp": datetime.now().isoformat(),
        "input": {
            "child_id": child_id,
            "transaction_count": len(transactions),
            "transaction_categories": list(set([txn.get("category", "") for txn in transactions if txn.get("category")])),
            "prompt": full_prompt[:1000] + "..." if len(full_prompt) > 1000 else full_prompt,
            "rag_context_length": len(rag_context),
            "tools_used": ["get_user_profile", "retrieve_financial_concepts"]
        },
        "output": None,
        "reasoning": None,
        "error": None
    }
    
    try:
        # Use Azure OpenAI client directly (no LangChain)
        response = azure_client.chat.completions.create(
            model=azure_openai_deployment,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.7,
            timeout=120.0
        )
        
        # Parse JSON response
        response_text = response.choices[0].message.content
        result = json.loads(response_text)
        
        # Update LLM call details with successful result
        llm_call_details["output"] = result
        llm_call_details["reasoning"] = {
            "hobbies_inferred": result.get("hobbies", []),
            "subjects_inferred": result.get("favoriteSubjects", []),
            "learning_style": result.get("preferredLearningStyle", ""),
            "pocket_money": result.get("pocketMoney", {})
        }
        llm_call_details["error"] = None
        
    except Exception as e:
        # Update LLM call details with final error
        error_type = type(e).__name__
        error_msg = str(e)
        
        llm_call_details["error"] = {
            "error_type": error_type,
            "error_message": error_msg,
            "endpoint": azure_openai_endpoint,
            "deployment": azure_openai_deployment
        }
        
        # Return profile data with error details
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
        
        return {
            "profile": profile_data,
            "llm_call_details": llm_call_details
        }

    # 4.5️⃣ Validate LLM results
    if not result.get("hobbies") and not result.get("favoriteSubjects"):
        print(f"Warning: LLM returned empty hobbies and subjects for {child_id}. Transaction count: {len(transactions)}")
        categories = [txn.get("category", "") for txn in transactions if txn.get("category")]
        print(f"Transaction categories found: {list(set(categories))}")

    # 5️⃣ Merge with user preferences using Agno tool
    try:
        preferences = call_agno_tool(get_profile_preferences, child_id=child_id)
        saved_hobbies = preferences.get("hobbies", [])
        saved_subjects = preferences.get("favoriteSubjects", [])
        
        if saved_hobbies:
            result["hobbies"] = saved_hobbies
        if saved_subjects:
            result["favoriteSubjects"] = saved_subjects
    except Exception as e:
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
    
    # Attach LLM call details
    return {
        "profile": profile_data,
        "llm_call_details": llm_call_details
    }

# Create agent wrapper for compatibility (using agno_mock pattern)
from agno_mock import Agent as MockAgent

profile_agent = MockAgent(func=profile_agent_fn, name="ProfileContextAgent")

