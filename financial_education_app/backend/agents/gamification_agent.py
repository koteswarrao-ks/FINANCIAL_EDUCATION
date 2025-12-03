import json
import os
from agno_mock import Agent
from agents.agno_tools import get_gamification, save_gamification

# Helper to call Agno tools
def call_agno_tool(tool, **kwargs):
    """Helper to call Agno tool via entrypoint"""
    return tool.entrypoint(**kwargs)

def get_gamification_data(child_id: str):
    """Get gamification data using Agno tool"""
    return call_agno_tool(get_gamification, child_id=child_id)

def save_gamification_data(child_id: str, gam_data: dict):
    """Save gamification data using Agno tool"""
    call_agno_tool(save_gamification, child_id=child_id, gamification_data=gam_data)

def gamification_agent_fn(input):
    child_id = input["childId"]
    score = input["score"]
    concept = input["concept"]

    # Get current gamification data using tool
    entry = get_gamification_data(child_id)
    
    # Ensure entry has required fields
    if "points" not in entry:
        entry["points"] = 0
    if "level" not in entry:
        entry["level"] = 1
    if "badges" not in entry:
        entry["badges"] = []

    # Update points and level
    entry["points"] += score * 10
    entry["level"] = 1 + (entry["points"] // 100)

    # Add badge if not already present
    badge = f"{concept} Master"
    if badge not in entry["badges"]:
        entry["badges"].append(badge)

    # Ensure childId is set
    entry["childId"] = child_id

    # Save using tool
    save_gamification_data(child_id, entry)
    
    return entry

gamification_agent = Agent(func=gamification_agent_fn, name="GamificationAgent")
