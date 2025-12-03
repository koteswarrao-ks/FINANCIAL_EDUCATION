from fastapi import FastAPI
from fastapi.responses import JSONResponse
import json
from pathlib import Path

app = FastAPI(title="MCP Server")

# ------------------------ USER PROFILE ------------------------
user_data_path = Path(__file__).parent / "user_data.json"

def get_user_data():
    """Load user data from JSON file"""
    with open(user_data_path, "r") as f:
        return json.load(f)

@app.get("/user_profile/{child_id}")
def get_user_profile(child_id: str):
    user_data = get_user_data()
    children = user_data.get("children", [])
    
    for child in children:
        if child.get("childId") == child_id:
            return JSONResponse(content=child)
    
    return JSONResponse(content={"error": "User not found"}, status_code=404)

@app.post("/login")
def login(credentials: dict):
    """Validate username and password, return child_id if valid"""
    username = credentials.get("username", "").lower()
    password = credentials.get("password", "")
    
    user_data = get_user_data()
    children = user_data.get("children", [])
    
    for child in children:
        if child.get("username", "").lower() == username and child.get("password") == password:
            return {
                "success": True,
                "childId": child.get("childId"),
                "name": child.get("basicProfile", {}).get("name"),
                "message": "Login successful"
            }
    
    return JSONResponse(
        content={"success": False, "message": "Invalid username or password"},
        status_code=401
    )



# ----------------------- QUIZ HISTORY -------------------------

def quiz_history_path():
    user_data_dir = Path(__file__).parent / "user_data"
    user_data_dir.mkdir(exist_ok=True)
    return user_data_dir / "quiz_history.json"

def get_quiz_history_data():
    """Load all quiz history data"""
    path = quiz_history_path()
    if not path.exists():
        return {"children": []}
    with open(path, "r") as f:
        return json.load(f)

def find_child_quiz_history(child_id: str):
    """Find quiz history for a specific child"""
    data = get_quiz_history_data()
    for child in data.get("children", []):
        if child.get("childId") == child_id:
            return child
    return None

def save_quiz_history_data(data: dict):
    """Save all quiz history data"""
    path = quiz_history_path()
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

@app.get("/quiz_history/{child_id}")
def get_quiz_history(child_id: str):
    child_data = find_child_quiz_history(child_id)
    
    if not child_data:
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
    
    return child_data

@app.post("/quiz_history/{child_id}")
def save_quiz_history(child_id: str, body: dict):
    data = get_quiz_history_data()
    children = data.get("children", [])
    
    # Find and update or create child entry
    found = False
    for i, child in enumerate(children):
        if child.get("childId") == child_id:
            children[i] = body
            found = True
            break
    
    if not found:
        children.append(body)
    
    data["children"] = children
    save_quiz_history_data(data)
    return {"status": "success"}



# --------------------- LEARNING PROGRESS -----------------------

TOPICS = [
    "Budgeting",
    "Value Creation",
    "Entrepreneurship",
    "Earning Skills",
    "Investing",
    "Digital Money"
]

def learning_progress_path():
    user_data_dir = Path(__file__).parent / "user_data"
    user_data_dir.mkdir(exist_ok=True)
    return user_data_dir / "learning_progress.json"

def get_learning_progress_data():
    """Load all learning progress data"""
    path = learning_progress_path()
    if not path.exists():
        return {"children": []}
    with open(path, "r") as f:
        return json.load(f)

def find_child_progress(child_id: str):
    """Find learning progress for a specific child"""
    data = get_learning_progress_data()
    for child in data.get("children", []):
        if child.get("childId") == child_id:
            return child
    return None

def save_learning_progress_data(data: dict):
    """Save all learning progress data"""
    path = learning_progress_path()
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

@app.get("/learning_progress/{child_id}")
def get_progress(child_id: str):
    child_data = find_child_progress(child_id)
    
    if not child_data:
        # Return default structure
        return {
            "childId": child_id,
            "completedTopics": [],
            "pendingTopics": TOPICS.copy(),
            "currentTopic": TOPICS[0]
        }
    
    return child_data

@app.post("/learning_progress/{child_id}")
def save_progress(child_id: str, body: dict):
    data = get_learning_progress_data()
    children = data.get("children", [])
    
    # Find and update or create child entry
    found = False
    for i, child in enumerate(children):
        if child.get("childId") == child_id:
            children[i] = body
            found = True
            break
    
    if not found:
        children.append(body)
    
    data["children"] = children
    save_learning_progress_data(data)
    return {"status": "success"}


# --------------------- PROFILE PREFERENCES -----------------------

def profile_preferences_path():
    user_data_dir = Path(__file__).parent / "user_data"
    user_data_dir.mkdir(exist_ok=True)
    return user_data_dir / "profile_preferences.json"

def get_profile_preferences_data():
    """Load all profile preferences data"""
    path = profile_preferences_path()
    if not path.exists():
        return {"children": []}
    with open(path, "r") as f:
        return json.load(f)

def find_child_preferences(child_id: str):
    """Find profile preferences for a specific child"""
    data = get_profile_preferences_data()
    for child in data.get("children", []):
        if child.get("childId") == child_id:
            return child
    return None

def save_profile_preferences_data(data: dict):
    """Save all profile preferences data"""
    path = profile_preferences_path()
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

@app.get("/profile_preferences/{child_id}")
def get_profile_preferences(child_id: str):
    child_data = find_child_preferences(child_id)
    
    if not child_data:
        # Return default structure
        return {
            "childId": child_id,
            "hobbies": [],
            "favoriteSubjects": []
        }
    
    return child_data

@app.post("/profile_preferences/{child_id}")
def save_profile_preferences(child_id: str, body: dict):
    data = get_profile_preferences_data()
    children = data.get("children", [])
    
    # Find and update or create child entry
    found = False
    for i, child in enumerate(children):
        if child.get("childId") == child_id:
            children[i] = body
            found = True
            break
    
    if not found:
        children.append(body)
    
    data["children"] = children
    save_profile_preferences_data(data)
    return {"status": "success"}


# --------------------- GAMIFICATION -----------------------

def gamification_path():
    user_data_dir = Path(__file__).parent / "user_data"
    user_data_dir.mkdir(exist_ok=True)
    return user_data_dir / "gamification.json"

def get_gamification_data():
    """Load all gamification data"""
    path = gamification_path()
    if not path.exists():
        return {"children": []}
    with open(path, "r") as f:
        return json.load(f)

def find_child_gamification(child_id: str):
    """Find gamification data for a specific child"""
    data = get_gamification_data()
    for child in data.get("children", []):
        if child.get("childId") == child_id:
            return child
    return None

def save_gamification_data(data: dict):
    """Save all gamification data"""
    path = gamification_path()
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

@app.get("/gamification/{child_id}")
def get_gamification(child_id: str):
    """Get gamification data (points, level, badges) for a specific child"""
    child_data = find_child_gamification(child_id)
    
    if not child_data:
        # Return default structure
        return {
            "childId": child_id,
            "points": 0,
            "level": 1,
            "badges": []
        }
    
    return child_data

@app.post("/gamification/{child_id}")
def save_gamification(child_id: str, body: dict):
    """Save gamification data for a specific child"""
    data = get_gamification_data()
    children = data.get("children", [])
    
    # Find and update or create child entry
    found = False
    for i, child in enumerate(children):
        if child.get("childId") == child_id:
            children[i] = body
            found = True
            break
    
    if not found:
        children.append(body)
    
    data["children"] = children
    save_gamification_data(data)
    return {"status": "success"}

@app.get("/leaderboard")
def get_leaderboard():
    """Get leaderboard with all users sorted by points (descending) with rankings"""
    gamification_data = get_gamification_data()
    user_data = get_user_data()
    
    # Create a mapping of childId to gamification data
    gamification_map = {}
    for child in gamification_data.get("children", []):
        child_id = child.get("childId")
        gamification_map[child_id] = {
            "points": child.get("points", 0),
            "level": child.get("level", 1),
            "badges": child.get("badges", [])
        }
    
    # Get all users and create leaderboard entries (include ALL users, even without gamification data)
    leaderboard_entries = []
    for child in user_data.get("children", []):
        child_id = child.get("childId")
        name = child.get("basicProfile", {}).get("name", "Unknown")
        
        # Get gamification data if exists, otherwise use defaults
        if child_id in gamification_map:
            gam_data = gamification_map[child_id]
            points = gam_data["points"]
            level = gam_data["level"]
            badges = gam_data["badges"]
        else:
            # Default values for users without gamification data
            points = 0
            level = 1
            badges = []
        
        leaderboard_entries.append({
            "childId": child_id,
            "name": name,
            "points": points,
            "level": level,
            "badges": badges
        })
    
    # Sort by points (descending)
    leaderboard_entries.sort(key=lambda x: x["points"], reverse=True)
    
    # Add ranking
    for i, entry in enumerate(leaderboard_entries):
        entry["rank"] = i + 1
    
    return {
        "success": True,
        "leaderboard": leaderboard_entries
    }


# ------------------------- HEALTH CHECK -------------------------
@app.get("/health")
def health():
    return {"status": "OK"}
