from fastapi import FastAPI
from fastapi.responses import JSONResponse
import json
from pathlib import Path

app = FastAPI(title="MCP Server")

# ------------------------ USER PROFILE ------------------------
user_data_path = Path(__file__).parent / "user_data.json"

with open(user_data_path, "r") as f:
    USER_DATA = json.load(f)

@app.get("/user_profile/{child_id}")
def get_user_profile(child_id: str):
    user = USER_DATA.get(child_id)
    if user:
        return JSONResponse(content=user)
    return JSONResponse(content={"error": "User not found"}, status_code=404)



# ----------------------- QUIZ HISTORY -------------------------

def quiz_history_path(child_id):
    user_data_dir = Path(__file__).parent / "user_data"
    user_data_dir.mkdir(exist_ok=True)
    return user_data_dir / f"quiz_history_{child_id}.json"

@app.get("/quiz_history/{child_id}")
def get_quiz_history(child_id: str):
    path = quiz_history_path(child_id)

    if not path.exists():
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

    with open(path, "r") as f:
        return json.load(f)

@app.post("/quiz_history/{child_id}")
def save_quiz_history(child_id: str, body: dict):
    path = quiz_history_path(child_id)
    with open(path, "w") as f:
        json.dump(body, f, indent=2)
    return {"status": "success"}



# --------------------- LEARNING PROGRESS -----------------------

TOPICS = [
    "Budgeting",
    "Value Creation",
    "Entrepreneurship",
    "Earning Through Skills",
    "Investing",
    "Digital Money"
]

def learning_progress_path(child_id):
    user_data_dir = Path(__file__).parent / "user_data"
    user_data_dir.mkdir(exist_ok=True)
    return user_data_dir / f"learning_progress_{child_id}.json"

@app.get("/learning_progress/{child_id}")
def get_progress(child_id: str):
    path = learning_progress_path(child_id)

    if not path.exists():
        return {
            "childId": child_id,
            "completedTopics": [],
            "pendingTopics": TOPICS.copy(),
            "currentTopic": TOPICS[0]
        }

    with open(path, "r") as f:
        return json.load(f)

@app.post("/learning_progress/{child_id}")
def save_progress(child_id: str, body: dict):
    path = learning_progress_path(child_id)
    with open(path, "w") as f:
        json.dump(body, f, indent=2)
    return {"status": "success"}



# ------------------------- HEALTH CHECK -------------------------
@app.get("/health")
def health():
    return {"status": "OK"}
