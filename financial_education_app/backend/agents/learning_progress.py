import requests
import os

MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")

TOPICS = [
    "Budgeting",
    "Value Creation",
    "Entrepreneurship",
    "Earning Through Skills",
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

    if not pending:
        progress["currentTopic"] = None
        save_progress(child_id, progress)
        return None

    topic = pending[0]
    progress["currentTopic"] = topic
    save_progress(child_id, progress)
    return topic


def mark_topic_completed(child_id: str, topic: str):
    progress = load_progress(child_id)

    if topic in progress["pendingTopics"]:
        progress["pendingTopics"].remove(topic)

    if topic not in progress["completedTopics"]:
        progress["completedTopics"].append(topic)

    if progress["pendingTopics"]:
        progress["currentTopic"] = progress["pendingTopics"][0]
    else:
        progress["currentTopic"] = None

    save_progress(child_id, progress)
    return progress
