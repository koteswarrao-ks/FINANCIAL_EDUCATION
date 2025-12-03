"""
Agno Tools for Financial Education Agents

This module defines all tools available to agents using Agno's tool framework.
Replaces LangChain tools with Agno tools.
"""

import os
import json
import requests
from typing import Optional, Dict, Any, List
from agno.tools import tool

# MCP Server Configuration
MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")

# RAG Configuration - Direct ChromaDB (no LangChain)
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
RAG_DIR = os.path.join(BASE_DIR, "rag")
CHROMA_PATH = os.path.join(RAG_DIR, "chroma_store")

# Initialize RAG components (lazy loading)
_rag_embeddings = None
_rag_vectordb = None

def _get_rag_components():
    """Lazy initialization of RAG components using direct ChromaDB"""
    global _rag_embeddings, _rag_vectordb
    
    if _rag_embeddings is None:
        from sentence_transformers import SentenceTransformer
        _rag_embeddings = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    
    if _rag_vectordb is None:
        import chromadb
        from chromadb.config import Settings
        
        client = chromadb.PersistentClient(
            path=CHROMA_PATH,
            settings=Settings(anonymized_telemetry=False)
        )
        _rag_vectordb = client.get_or_create_collection(
            name="financial_concepts",
            metadata={"hnsw:space": "cosine"}
        )
    
    return _rag_embeddings, _rag_vectordb


# ==================== MCP Server Tools ====================

def _get_user_profile_impl(child_id: str) -> Dict[str, Any]:
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
def get_user_profile(child_id: str) -> Dict[str, Any]:
    """Retrieves a child's user profile including basic profile and transaction history."""
    return _get_user_profile_impl(child_id)

def _get_learning_progress_impl(child_id: str) -> Dict[str, Any]:
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
def get_learning_progress(child_id: str) -> Dict[str, Any]:
    """Retrieves a child's learning progress including completed and pending topics."""
    return _get_learning_progress_impl(child_id)

def _save_learning_progress_impl(child_id: str, progress: Dict[str, Any]) -> Dict[str, Any]:
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
def save_learning_progress(child_id: str, progress: Dict[str, Any]) -> Dict[str, Any]:
    """Saves a child's learning progress to the MCP server."""
    return _save_learning_progress_impl(child_id, progress)

def _get_quiz_history_impl(child_id: str) -> Dict[str, Any]:
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
def get_quiz_history(child_id: str) -> Dict[str, Any]:
    """Retrieves a child's quiz history including weak areas, strong areas, and concept history."""
    return _get_quiz_history_impl(child_id)

def _save_quiz_history_impl(child_id: str, quiz_history: Dict[str, Any]) -> Dict[str, Any]:
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
def save_quiz_history(child_id: str, quiz_history: Dict[str, Any]) -> Dict[str, Any]:
    """Saves a child's quiz history to the MCP server."""
    return _save_quiz_history_impl(child_id, quiz_history)

def _get_profile_preferences_impl(child_id: str) -> Dict[str, Any]:
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
def get_profile_preferences(child_id: str) -> Dict[str, Any]:
    """Retrieves a child's saved profile preferences (hobbies, favorite subjects)."""
    return _get_profile_preferences_impl(child_id)

def _save_profile_preferences_impl(child_id: str, preferences: Dict[str, Any]) -> Dict[str, Any]:
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
def save_profile_preferences(child_id: str, preferences: Dict[str, Any]) -> Dict[str, Any]:
    """Saves a child's profile preferences to the MCP server."""
    return _save_profile_preferences_impl(child_id, preferences)

def _get_gamification_impl(child_id: str) -> Dict[str, Any]:
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
def get_gamification(child_id: str) -> Dict[str, Any]:
    """Retrieves a child's gamification data including points, level, and badges."""
    return _get_gamification_impl(child_id)

def _save_gamification_impl(child_id: str, gamification_data: Dict[str, Any]) -> Dict[str, Any]:
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

@tool
def save_gamification(child_id: str, gamification_data: Dict[str, Any]) -> Dict[str, Any]:
    """Saves a child's gamification data to the MCP server."""
    return _save_gamification_impl(child_id, gamification_data)

# ==================== RAG Tools ====================

def _retrieve_financial_concepts_impl(query: str, k: int = 5) -> List[Dict[str, Any]]:
    """
    Retrieves relevant financial education concepts from the knowledge base using semantic search.
    Uses direct ChromaDB (no LangChain).
    
    Args:
        query: The search query describing what financial concepts to retrieve
        k: Number of documents to retrieve (default: 5)
    
    Returns:
        List of dictionaries containing content and metadata for each retrieved document
    """
    try:
        embeddings, vectordb = _get_rag_components()
        
        # Generate query embedding
        query_embedding = embeddings.encode(query).tolist()
        
        # Search in ChromaDB
        results = vectordb.query(
            query_embeddings=[query_embedding],
            n_results=k
        )
        
        # Format results
        documents = []
        if results['ids'] and len(results['ids'][0]) > 0:
            for i in range(len(results['ids'][0])):
                doc_id = results['ids'][0][i]
                metadata = results['metadatas'][0][i] if results['metadatas'] and results['metadatas'][0] else {}
                content = results['documents'][0][i] if results['documents'] and results['documents'][0] else ""
                
                documents.append({
                    "content": content,
                    "metadata": metadata,
                    "source": metadata.get("source", "unknown"),
                    "topic": metadata.get("topic", "unknown"),
                    "id": doc_id
                })
        
        return documents
    except Exception as e:
        return [{"error": f"RAG retrieval failed: {str(e)}"}]

@tool
def retrieve_financial_concepts(query: str, k: int = 5) -> List[Dict[str, Any]]:
    """Retrieves relevant financial education concepts from the knowledge base using semantic search."""
    return _retrieve_financial_concepts_impl(query, k)

def _retrieve_financial_concepts_by_topic_impl(topic: str, k: int = 5) -> List[Dict[str, Any]]:
    """
    Retrieves financial concepts matching a specific topic exactly.
    Uses direct ChromaDB with topic filtering.
    
    Args:
        topic: The exact topic name (e.g., "Budgeting", "Investing")
        k: Maximum number of documents to retrieve (default: 5)
    
    Returns:
        List of dictionaries containing content and metadata for matching documents
    """
    try:
        embeddings, vectordb = _get_rag_components()
        
        # Generate topic embedding
        topic_embedding = embeddings.encode(topic).tolist()
        
        # Search with large k to get all matching entries
        results = vectordb.query(
            query_embeddings=[topic_embedding],
            n_results=100,  # Get many results to filter
            where={"topic": topic} if hasattr(vectordb, 'where') else None
        )
        
        # Filter to exact topic match (case-insensitive)
        documents = []
        if results['ids'] and len(results['ids'][0]) > 0:
            import random
            topic_matched = []
            
            for i in range(len(results['ids'][0])):
                metadata = results['metadatas'][0][i] if results['metadatas'] and results['metadatas'][0] else {}
                doc_topic = metadata.get("topic", "")
                
                if doc_topic.lower() == topic.lower():
                    doc_id = results['ids'][0][i]
                    content = results['documents'][0][i] if results['documents'] and results['documents'][0] else ""
                    
                    topic_matched.append({
                        "content": content,
                        "metadata": metadata,
                        "source": metadata.get("source", "unknown"),
                        "topic": doc_topic,
                        "entry_id": metadata.get("id", doc_id)
                    })
            
            # Randomly select up to k entries
            if topic_matched:
                random.shuffle(topic_matched)
                documents = topic_matched[:k]
            else:
                # Fallback: use top k results
                for i in range(min(k, len(results['ids'][0]))):
                    doc_id = results['ids'][0][i]
                    metadata = results['metadatas'][0][i] if results['metadatas'] and results['metadatas'][0] else {}
                    content = results['documents'][0][i] if results['documents'] and results['documents'][0] else ""
                    
                    documents.append({
                        "content": content,
                        "metadata": metadata,
                        "source": metadata.get("source", "unknown"),
                        "topic": metadata.get("topic", "unknown"),
                        "entry_id": metadata.get("id", doc_id)
                    })
        
        return documents
    except Exception as e:
        return [{"error": f"Topic-based RAG retrieval failed: {str(e)}"}]

@tool
def retrieve_financial_concepts_by_topic(topic: str, k: int = 5) -> List[Dict[str, Any]]:
    """Retrieves financial concepts matching a specific topic exactly."""
    return _retrieve_financial_concepts_by_topic_impl(topic, k)

# ==================== Learning Progress Helper Tools ====================

def _get_next_topic_helper(child_id: str) -> Optional[str]:
    """Helper function to get next topic (not a tool, used internally)"""
    progress = _get_learning_progress_impl(child_id)
    pending = progress.get("pendingTopics", [])
    completed = progress.get("completedTopics", [])
    
    if not pending:
        progress["currentTopic"] = None
        _save_learning_progress_impl(child_id, progress)
        return None
    
    # Use currentTopic if it exists and is still in pending topics
    current_topic = progress.get("currentTopic")
    if current_topic and current_topic in pending and current_topic not in completed:
        return current_topic
    
    # Filter out completed topics
    available_pending = [t for t in pending if t not in completed]
    if not available_pending:
        progress["currentTopic"] = None
        _save_learning_progress_impl(child_id, progress)
        return None
    
    topic = available_pending[0]
    progress["currentTopic"] = topic
    _save_learning_progress_impl(child_id, progress)
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
    """Helper function to mark topic as completed (not a tool, used internally)"""
    progress = _get_learning_progress_impl(child_id)
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
    
    _save_learning_progress_impl(child_id, progress)
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

