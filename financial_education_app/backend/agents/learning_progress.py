import requests
import os

MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")

TOPICS = [
    "Budgeting",
    "Value Creation",
    "Entrepreneurship",
    "Earning Skills",
    "Investing",
    "Digital Money"
]

def load_progress(child_id: str):
    try:
        resp = requests.get(f"{MCP_SERVER_URL}/learning_progress/{child_id}", timeout=5)
        if resp.status_code == 200:
            return resp.json()
    except:
        pass

    return {
        "childId": child_id,
        "completedTopics": [],
        "pendingTopics": TOPICS.copy(),
        "currentTopic": TOPICS[0]
    }


def save_progress(child_id: str, progress: dict):
    requests.post(
        f"{MCP_SERVER_URL}/learning_progress/{child_id}",
        json=progress,
        timeout=5
    )


def get_next_topic(child_id: str):
    progress = load_progress(child_id)
    pending = progress["pendingTopics"]
    completed = progress.get("completedTopics", [])

    if not pending:
        progress["currentTopic"] = None
        save_progress(child_id, progress)
        return None

    # Use currentTopic if it exists and is still in pending topics (and not completed)
    current_topic = progress.get("currentTopic")
    if current_topic and current_topic in pending and current_topic not in completed:
        # Keep using the current topic, no need to update
        topic = current_topic
    else:
        # Current topic is completed, doesn't exist, or not in pending - use the first pending topic
        # Filter out any topics that are already completed
        available_pending = [t for t in pending if t not in completed]
        if not available_pending:
            progress["currentTopic"] = None
            save_progress(child_id, progress)
            return None
        topic = available_pending[0]
        progress["currentTopic"] = topic
        save_progress(child_id, progress)
    
    return topic


def mark_topic_completed(child_id: str, topic: str):
    progress = load_progress(child_id)
    pending = progress.get("pendingTopics", [])
    completed = progress.get("completedTopics", [])

    # Find exact match first
    matched_topic = None
    if topic in pending:
        matched_topic = topic
    elif topic in completed:
        # Already completed, nothing to do
        return progress
    else:
        # Try to find a match in pending topics (handle partial matches)
        # Prefer longer/more specific matches
        for pending_topic in pending:
            if topic.lower() == pending_topic.lower():
                matched_topic = pending_topic
                break
            elif topic.lower() in pending_topic.lower() or pending_topic.lower() in topic.lower():
                # If we find a partial match, prefer the more specific one
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

    save_progress(child_id, progress)
    return progress
