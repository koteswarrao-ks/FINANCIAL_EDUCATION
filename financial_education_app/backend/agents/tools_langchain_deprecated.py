"""
LangChain Tools for Financial Education Agents

This module defines all tools available to agents using LangChain's tool framework.
Tools provide structured, reusable operations for MCP server interactions,
RAG retrieval, and learning progress management.
"""

import os
import json
import requests
from typing import Optional, Dict, Any, List
from langchain_core.tools import tool
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

# MCP Server Configuration
MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")

# RAG Configuration
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
RAG_DIR = os.path.join(BASE_DIR, "rag")
CHROMA_PATH = os.path.join(RAG_DIR, "chroma_store")

# Initialize RAG components (lazy loading)
_rag_embeddings = None
_rag_vectordb = None
_rag_retriever = None

def _get_rag_components():
    """Lazy initialization of RAG components"""
    global _rag_embeddings, _rag_vectordb, _rag_retriever
    
    if _rag_embeddings is None:
        _rag_embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            model_kwargs={'device': 'cpu'}
        )
    
    if _rag_vectordb is None:
        _rag_vectordb = Chroma(
            embedding_function=_rag_embeddings,
            persist_directory=CHROMA_PATH,
            collection_name="financial_concepts"
        )
    
    if _rag_retriever is None:
        _rag_retriever = _rag_vectordb.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 5}
        )
    
    return _rag_embeddings, _rag_vectordb, _rag_retriever


# ==================== MCP Server Tools ====================

@tool
def get_user_profile(child_id: str) -> Dict[str, Any]:
    """
    Retrieves a child's user profile including basic profile and transaction history.
    
    Args:
        child_id: The unique identifier for the child (e.g., "kid_001")
    
    Returns:
        Dictionary containing childId, basicProfile, and transactions
    """
    try:
        resp = requests.get(f"{MCP_SERVER_URL}/user_profile/{child_id}", timeout=5)
        resp.raise_for_status()
        return resp.json()
    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to fetch user profile: {str(e)}"}


@tool
def get_learning_progress(child_id: str) -> Dict[str, Any]:
    """
    Retrieves a child's learning progress including completed and pending topics.
    
    Args:
        child_id: The unique identifier for the child
    
    Returns:
        Dictionary with childId, completedTopics, pendingTopics, and currentTopic
    """
    try:
        resp = requests.get(f"{MCP_SERVER_URL}/learning_progress/{child_id}", timeout=5)
        if resp.status_code == 200:
            return resp.json()
    except:
        pass
    
    # Return default structure
    return {
        "childId": child_id,
        "completedTopics": [],
        "pendingTopics": ["Budgeting", "Value Creation", "Entrepreneurship", "Earning Skills", "Investing", "Digital Money"],
        "currentTopic": "Budgeting"
    }


@tool
def save_learning_progress(child_id: str, progress: Dict[str, Any]) -> Dict[str, Any]:
    """
    Saves a child's learning progress to the MCP server.
    
    Args:
        child_id: The unique identifier for the child
        progress: Dictionary containing completedTopics, pendingTopics, and currentTopic
    
    Returns:
        Status dictionary with success indicator
    """
    try:
        resp = requests.post(
            f"{MCP_SERVER_URL}/learning_progress/{child_id}",
            json=progress,
            timeout=5
        )
        resp.raise_for_status()
        return {"status": "success"}
    except requests.exceptions.RequestException as e:
        return {"status": "error", "message": str(e)}


@tool
def get_quiz_history(child_id: str) -> Dict[str, Any]:
    """
    Retrieves a child's quiz history including weak areas, strong areas, and concept history.
    
    Args:
        child_id: The unique identifier for the child
    
    Returns:
        Dictionary with quiz performance data
    """
    try:
        resp = requests.get(f"{MCP_SERVER_URL}/quiz_history/{child_id}", timeout=5)
        if resp.status_code == 200:
            return resp.json()
    except:
        pass
    
    # Return default structure
    return {
        "childId": child_id,
        "conceptHistory": {},
        "weakAreas": [],
        "strongAreas": [],
        "questionTypePerformance": {
            "MCQ": 60,
            "Scenario": 50,
            "Calculation": 40
        }
    }


@tool
def save_quiz_history(child_id: str, quiz_history: Dict[str, Any]) -> Dict[str, Any]:
    """
    Saves a child's quiz history to the MCP server.
    
    Args:
        child_id: The unique identifier for the child
        quiz_history: Dictionary containing quiz performance data
    
    Returns:
        Status dictionary with success indicator
    """
    try:
        resp = requests.post(
            f"{MCP_SERVER_URL}/quiz_history/{child_id}",
            json=quiz_history,
            timeout=5
        )
        resp.raise_for_status()
        return {"status": "success"}
    except requests.exceptions.RequestException as e:
        return {"status": "error", "message": str(e)}


@tool
def get_profile_preferences(child_id: str) -> Dict[str, Any]:
    """
    Retrieves a child's saved profile preferences (hobbies, favorite subjects).
    
    Args:
        child_id: The unique identifier for the child
    
    Returns:
        Dictionary with hobbies and favoriteSubjects arrays
    """
    try:
        resp = requests.get(f"{MCP_SERVER_URL}/profile_preferences/{child_id}", timeout=5)
        if resp.status_code == 200:
            return resp.json()
    except:
        pass
    
    # Return default structure
    return {
        "childId": child_id,
        "hobbies": [],
        "favoriteSubjects": []
    }


@tool
def save_profile_preferences(child_id: str, preferences: Dict[str, Any]) -> Dict[str, Any]:
    """
    Saves a child's profile preferences to the MCP server.
    
    Args:
        child_id: The unique identifier for the child
        preferences: Dictionary containing hobbies and favoriteSubjects
    
    Returns:
        Status dictionary with success indicator
    """
    try:
        resp = requests.post(
            f"{MCP_SERVER_URL}/profile_preferences/{child_id}",
            json=preferences,
            timeout=5
        )
        resp.raise_for_status()
        return {"status": "success"}
    except requests.exceptions.RequestException as e:
        return {"status": "error", "message": str(e)}


@tool
def get_gamification(child_id: str) -> Dict[str, Any]:
    """
    Retrieves a child's gamification data including points, level, and badges.
    
    Args:
        child_id: The unique identifier for the child
    
    Returns:
        Dictionary with points, level, and badges
    """
    try:
        resp = requests.get(f"{MCP_SERVER_URL}/gamification/{child_id}", timeout=5)
        if resp.status_code == 200:
            return resp.json()
    except:
        pass
    
    # Return default structure
    return {
        "childId": child_id,
        "points": 0,
        "level": 1,
        "badges": []
    }


@tool
def save_gamification(child_id: str, gamification_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Saves a child's gamification data to the MCP server.
    
    Args:
        child_id: The unique identifier for the child
        gamification_data: Dictionary containing points, level, and badges
    
    Returns:
        Status dictionary with success indicator
    """
    try:
        resp = requests.post(
            f"{MCP_SERVER_URL}/gamification/{child_id}",
            json=gamification_data,
            timeout=5
        )
        resp.raise_for_status()
        return {"status": "success"}
    except requests.exceptions.RequestException as e:
        return {"status": "error", "message": str(e)}


# ==================== RAG Tools ====================

@tool
def retrieve_financial_concepts(query: str, k: int = 5) -> List[Dict[str, Any]]:
    """
    Retrieves relevant financial education concepts from the knowledge base using semantic search.
    
    Args:
        query: The search query describing what financial concepts to retrieve
        k: Number of documents to retrieve (default: 5)
    
    Returns:
        List of dictionaries containing page_content and metadata for each retrieved document
    """
    try:
        _, _, retriever = _get_rag_components()
        docs = retriever.invoke(query)
        
        return [
            {
                "content": doc.page_content,
                "metadata": doc.metadata,
                "source": doc.metadata.get("source", "unknown"),
                "topic": doc.metadata.get("topic", "unknown")
            }
            for doc in docs
        ]
    except Exception as e:
        return [{"error": f"RAG retrieval failed: {str(e)}"}]


@tool
def retrieve_financial_concepts_by_topic(topic: str, k: int = 5) -> List[Dict[str, Any]]:
    """
    Retrieves financial concepts matching a specific topic exactly.
    Uses semantic search with topic filtering to ensure topic relevance.
    
    Args:
        topic: The exact topic name (e.g., "Budgeting", "Investing")
        k: Maximum number of documents to retrieve (default: 5)
    
    Returns:
        List of dictionaries containing page_content and metadata for matching documents
    """
    try:
        _, vectordb, _ = _get_rag_components()
        
        # Retrieve a large number to ensure we get all matching entries
        all_docs = vectordb.similarity_search_with_score(topic, k=100)
        all_docs = [doc for doc, score in all_docs]
        
        # Filter to ONLY entries that match the exact topic (case-insensitive)
        topic_matched_docs = [
            d for d in all_docs 
            if d.metadata.get("topic", "").lower() == topic.lower()
        ]
        
        # Randomly select up to k entries
        import random
        if topic_matched_docs:
            random.shuffle(topic_matched_docs)
            docs = topic_matched_docs[:k]
        else:
            # Fallback to standard retrieval if no exact match
            _, _, retriever = _get_rag_components()
            docs = retriever.invoke(topic)
        
        return [
            {
                "content": doc.page_content,
                "metadata": doc.metadata,
                "source": doc.metadata.get("source", "unknown"),
                "topic": doc.metadata.get("topic", "unknown"),
                "entry_id": doc.metadata.get("id", "unknown")
            }
            for doc in docs
        ]
    except Exception as e:
        return [{"error": f"Topic-based RAG retrieval failed: {str(e)}"}]


# ==================== Learning Progress Helper Tools ====================

def _get_next_topic_helper(child_id: str) -> Optional[str]:
    """
    Helper function to get next topic (not a tool, used internally).
    """
    try:
        resp = requests.get(f"{MCP_SERVER_URL}/learning_progress/{child_id}", timeout=5)
        if resp.status_code == 200:
            progress = resp.json()
        else:
            progress = {
                "childId": child_id,
                "completedTopics": [],
                "pendingTopics": ["Budgeting", "Value Creation", "Entrepreneurship", "Earning Skills", "Investing", "Digital Money"],
                "currentTopic": "Budgeting"
            }
    except:
        progress = {
            "childId": child_id,
            "completedTopics": [],
            "pendingTopics": ["Budgeting", "Value Creation", "Entrepreneurship", "Earning Skills", "Investing", "Digital Money"],
            "currentTopic": "Budgeting"
        }
    
    pending = progress.get("pendingTopics", [])
    completed = progress.get("completedTopics", [])
    
    if not pending:
        progress["currentTopic"] = None
        try:
            requests.post(f"{MCP_SERVER_URL}/learning_progress/{child_id}", json=progress, timeout=5)
        except:
            pass
        return None
    
    # Use currentTopic if it exists and is still in pending topics
    current_topic = progress.get("currentTopic")
    if current_topic and current_topic in pending and current_topic not in completed:
        return current_topic
    
    # Filter out completed topics
    available_pending = [t for t in pending if t not in completed]
    if not available_pending:
        progress["currentTopic"] = None
        try:
            requests.post(f"{MCP_SERVER_URL}/learning_progress/{child_id}", json=progress, timeout=5)
        except:
            pass
        return None
    
    topic = available_pending[0]
    progress["currentTopic"] = topic
    try:
        requests.post(f"{MCP_SERVER_URL}/learning_progress/{child_id}", json=progress, timeout=5)
    except:
        pass
    return topic


@tool
def get_next_topic(child_id: str) -> Optional[str]:
    """
    Gets the next learning topic for a child based on their progress.
    Updates the current topic in progress if needed.
    
    Args:
        child_id: The unique identifier for the child
    
    Returns:
        The next topic name (e.g., "Budgeting") or None if all topics completed
    """
    return _get_next_topic_helper(child_id)


def _mark_topic_completed_helper(child_id: str, topic: str) -> Dict[str, Any]:
    """
    Helper function to mark topic as completed (not a tool, used internally).
    """
    try:
        resp = requests.get(f"{MCP_SERVER_URL}/learning_progress/{child_id}", timeout=5)
        if resp.status_code == 200:
            progress = resp.json()
        else:
            progress = {
                "childId": child_id,
                "completedTopics": [],
                "pendingTopics": ["Budgeting", "Value Creation", "Entrepreneurship", "Earning Skills", "Investing", "Digital Money"],
                "currentTopic": "Budgeting"
            }
    except:
        progress = {
            "childId": child_id,
            "completedTopics": [],
            "pendingTopics": ["Budgeting", "Value Creation", "Entrepreneurship", "Earning Skills", "Investing", "Digital Money"],
            "currentTopic": "Budgeting"
        }
    
    pending = progress.get("pendingTopics", [])
    completed = progress.get("completedTopics", [])
    
    # Find exact match first
    matched_topic = None
    if topic in pending:
        matched_topic = topic
    elif topic in completed:
        # Already completed
        return progress
    else:
        # Try to find a match in pending topics
        for pending_topic in pending:
            if topic.lower() == pending_topic.lower():
                matched_topic = pending_topic
                break
            elif topic.lower() in pending_topic.lower() or pending_topic.lower() in topic.lower():
                if not matched_topic or len(pending_topic) > len(matched_topic):
                    matched_topic = pending_topic
    
    if matched_topic:
        # Remove from pending
        if matched_topic in pending:
            pending.remove(matched_topic)
            progress["pendingTopics"] = pending
        
        # Add to completed
        if matched_topic not in completed:
            completed.append(matched_topic)
            progress["completedTopics"] = completed
        
        # Update current topic if it was the one completed
        if progress.get("currentTopic") == matched_topic:
            if pending:
                progress["currentTopic"] = pending[0]
            else:
                progress["currentTopic"] = None
    
    try:
        requests.post(f"{MCP_SERVER_URL}/learning_progress/{child_id}", json=progress, timeout=5)
    except:
        pass
    return progress


@tool
def mark_topic_completed(child_id: str, topic: str) -> Dict[str, Any]:
    """
    Marks a learning topic as completed for a child and updates their progress.
    
    Args:
        child_id: The unique identifier for the child
        topic: The topic name to mark as completed
    
    Returns:
        Updated progress dictionary
    """
    return _mark_topic_completed_helper(child_id, topic)


# ==================== Tool Collections ====================

# All MCP tools
MCP_TOOLS = [
    get_user_profile,
    get_learning_progress,
    save_learning_progress,
    get_quiz_history,
    save_quiz_history,
    get_profile_preferences,
    save_profile_preferences,
    get_gamification,
    save_gamification
]

# All RAG tools
RAG_TOOLS = [
    retrieve_financial_concepts,
    retrieve_financial_concepts_by_topic
]

# All learning progress tools
PROGRESS_TOOLS = [
    get_next_topic,
    mark_topic_completed
]

# All available tools
ALL_TOOLS = MCP_TOOLS + RAG_TOOLS + PROGRESS_TOOLS

