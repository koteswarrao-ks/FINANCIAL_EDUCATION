import json
import os
from agno_mock import Agent

GAM_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "gamification.json")

def load_gam():
    # Ensure data directory exists
    os.makedirs(os.path.dirname(GAM_FILE), exist_ok=True)
    
    if os.path.exists(GAM_FILE):
        with open(GAM_FILE,"r") as f:
            return json.load(f)
    return {}

def save_gam(data):
    # Ensure data directory exists
    os.makedirs(os.path.dirname(GAM_FILE), exist_ok=True)
    
    with open(GAM_FILE,"w") as f:
        json.dump(data,f,indent=2)

def gamification_agent_fn(input):
    child_id = input["childId"]
    score = input["score"]
    concept = input["concept"]

    data = load_gam()
    if child_id not in data:
        data[child_id] = {"points":0,"level":1,"badges":[]}

    entry = data[child_id]

    entry["points"] += score * 10
    entry["level"] = 1 + (entry["points"] // 100)

    badge = f"{concept} Master"
    if badge not in entry["badges"]:
        entry["badges"].append(badge)

    save_gam(data)
    return entry

gamification_agent = Agent(func=gamification_agent_fn, name="GamificationAgent")
