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
    from langchain_openai import ChatOpenAI
except ImportError:
    # Fallback if langchain-openai has version issues
    ChatOpenAI = None

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

    # 3️⃣ Prompt
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert child financial education analyst. Use BOTH transaction data and RAG context."),
        ("system", "Always return VALID JSON. No explanation text."),
        ("human", """
Analyze the child's transaction data and infer:
1. Hobbies  
2. Favorite subjects  
3. Preferred learning style  
4. Pocket money pattern  

### Transaction Data:
{transactions}

### Relevant Knowledge (RAG):
{rag}

Return JSON:
{{
  "hobbies": [],
  "favoriteSubjects": [],
  "preferredLearningStyle": "",
  "pocketMoney": {{ "frequency": "", "amount": 0, "currency": "" }}
}}
""")
    ])

    # 4️⃣ Execute chain with LLM (semantic understanding, not keyword matching)
    if ChatOpenAI is None:
        raise RuntimeError("ChatOpenAI not available - check langchain-openai installation")
    
    try:
        model = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)
        parser = JsonOutputParser()
        chain = prompt | model | parser
        
        # Invoke chain - this uses semantic understanding, not keyword matching
        result = chain.invoke({
            "transactions": transactions_text,
            "rag": rag_context
        })
    except Exception as e:
        # If LLM fails, still raise error (no keyword fallback)
        raise RuntimeError(f"LLM processing failed: {type(e).__name__}: {str(e)}") from e

    # 5️⃣ Final personalization output
    return {
        "childId": data.get("childId"),
        "name": basic.get("name"),
        "age": basic.get("age"),
        "grade": basic.get("grade"),
        "country": basic.get("country"),
        "personalization": result
    }

# AGNO agent wrapper
profile_agent = Agent(func=profile_agent_fn, name="ProfileContextAgent")
