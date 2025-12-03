"""
Learning Progress Module - Now uses Agno tools for MCP operations
"""
from agents.agno_tools import (
    get_learning_progress,
    save_learning_progress,
    get_next_topic as _get_next_topic_tool,
    mark_topic_completed as _mark_topic_completed_tool
)

# Helper to call Agno tools
def call_agno_tool(tool, **kwargs):
    """Helper to call Agno tool via entrypoint"""
    return tool.entrypoint(**kwargs)

TOPICS = [
    "Budgeting",
    "Value Creation",
    "Entrepreneurship",
    "Earning Skills",
    "Investing",
    "Digital Money"
]

def load_progress(child_id: str):
    """Load learning progress using Agno tool"""
    return call_agno_tool(get_learning_progress, child_id=child_id)


def save_progress(child_id: str, progress: dict):
    """Save learning progress using Agno tool"""
    call_agno_tool(save_learning_progress, child_id=child_id, progress=progress)


def get_next_topic(child_id: str):
    """Get next topic using Agno tool"""
    return call_agno_tool(_get_next_topic_tool, child_id=child_id)


def mark_topic_completed(child_id: str, topic: str):
    """Mark topic as completed using Agno tool"""
    return call_agno_tool(_mark_topic_completed_tool, child_id=child_id, topic=topic)
