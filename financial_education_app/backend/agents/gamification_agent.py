import json
import os
import requests
from agno_mock import Agent

MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")

def get_gamification(child_id: str):
    """Get gamification data from MCP server"""
    try:
        resp = requests.get(f"{MCP_SERVER_URL}/gamification/{child_id}", timeout=5)
        if resp.status_code == 200:
            return resp.json()
    except:
        pass
    # Return default if fetch fails
    return {"childId": child_id, "points": 0, "level": 1, "badges": []}

def save_gamification(child_id: str, gam_data: dict):
    """Save gamification data to MCP server"""
    try:
        resp = requests.post(
            f"{MCP_SERVER_URL}/gamification/{child_id}",
            json=gam_data,
            timeout=5
        )
        resp.raise_for_status()
    except Exception as e:
        print(f"Warning: Failed to save gamification data: {e}")

def gamification_agent_fn(input):
    child_id = input["childId"]
    score = input["score"]
    concept = input["concept"]

    # Get current gamification data from MCP server
    entry = get_gamification(child_id)
    
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

    # Save to MCP server
    save_gamification(child_id, entry)
    
    return entry

gamification_agent = Agent(func=gamification_agent_fn, name="GamificationAgent")
