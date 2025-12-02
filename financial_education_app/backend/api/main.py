from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from agents.orchestration_agent import orchestration_agent
from agents.profile_agent import profile_agent
from agents.story_agent import story_agent
from agents.quiz_agent import quiz_agent
from agents.gamification_agent import gamification_agent
from agents.learning_progress import mark_topic_completed, load_progress

app = FastAPI(title="Financial Education API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProfileRequest(BaseModel):
    child_id: str


class StoryRequest(BaseModel):
    profile: Dict[str, Any]


class QuizRequest(BaseModel):
    story: Dict[str, Any]
    profile: Optional[Dict[str, Any]] = None


class QuizSubmission(BaseModel):
    quizId: str
    answers: Dict[int, str]  # question_id -> selected_answer
    correctAnswers: Dict[int, str]  # question_id -> correct_answer


@app.get("/")
def root():
    return {"message": "Financial Education API", "status": "running"}


@app.get("/api/start/{child_id}")
async def start_learning_journey(child_id: str):
    """
    Main orchestration endpoint: runs profile → story → quiz pipeline
    Returns complete learning package for UI
    """
    try:
        result = orchestration_agent.run({"child_id": child_id})
        
        if result.get("message") == "All topics completed":
            return {
                "success": True,
                "completed": True,
                "message": "All topics completed!",
                "progress": result.get("progress", {})
            }
        
        return {
            "success": True,
            "completed": False,
            "profile": result.get("profile"),
            "story": result.get("story"),
            "quiz": result.get("quiz"),
            "progress": result.get("progress", {})
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Orchestration failed: {str(e)}")


@app.post("/api/submit_quiz/{child_id}")
async def submit_quiz(child_id: str, submission: QuizSubmission):
    """
    Submit quiz answers, calculate score, update gamification and progress
    """
    try:
        # Calculate score
        total_questions = len(submission.correctAnswers)
        correct_count = sum(
            1 for q_id, answer in submission.answers.items()
            if submission.correctAnswers.get(q_id) == answer
        )
        score = int((correct_count / total_questions) * 100) if total_questions > 0 else 0
        
        # Get quiz and story data (we need concept from quiz)
        # For now, extract from quizId or fetch from stored data
        quiz_id_parts = submission.quizId.split("_")
        concept = quiz_id_parts[1].title() if len(quiz_id_parts) > 1 else "Unknown"
        
        # Update gamification
        gamification_result = gamification_agent.run({
            "childId": child_id,
            "score": score,
            "concept": concept
        })
        
        # Update quiz history in MCP
        import requests
        MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")
        
        # Fetch current quiz history
        quiz_history_resp = requests.get(f"{MCP_SERVER_URL}/quiz_history/{child_id}", timeout=5)
        quiz_history = quiz_history_resp.json() if quiz_history_resp.status_code == 200 else {
            "childId": child_id,
            "conceptHistory": {},
            "weakAreas": [],
            "strongAreas": [],
            "questionTypePerformance": {}
        }
        
        # Update concept history
        if concept not in quiz_history["conceptHistory"]:
            quiz_history["conceptHistory"][concept] = []
        
        quiz_history["conceptHistory"][concept].append({
            "score": score,
            "totalQuestions": total_questions,
            "correctAnswers": correct_count
        })
        
        # Update weak/strong areas based on score
        if score < 70:
            if concept not in quiz_history["weakAreas"]:
                quiz_history["weakAreas"].append(concept)
            if concept in quiz_history["strongAreas"]:
                quiz_history["strongAreas"].remove(concept)
        else:
            if concept not in quiz_history["strongAreas"]:
                quiz_history["strongAreas"].append(concept)
            if concept in quiz_history["weakAreas"]:
                quiz_history["weakAreas"].remove(concept)
        
        # Save quiz history
        requests.post(
            f"{MCP_SERVER_URL}/quiz_history/{child_id}",
            json=quiz_history,
            timeout=5
        )
        
        # Update learning progress if passed (score >= 70)
        next_story_available = False
        if score >= 70:
            mark_topic_completed(child_id, concept)
            progress = load_progress(child_id)
            next_story_available = len(progress.get("pendingTopics", [])) > 0
        else:
            progress = load_progress(child_id)
        
        return {
            "success": True,
            "score": score,
            "totalQuestions": total_questions,
            "correctAnswers": correct_count,
            "passed": score >= 70,
            "gamification": gamification_result,
            "progress": progress,
            "nextStoryAvailable": next_story_available
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Quiz submission failed: {str(e)}")


@app.get("/api/rewards/{child_id}")
async def get_rewards(child_id: str):
    """
    Get gamification data: points, level, badges
    """
    try:
        # Load gamification data
        gam_file = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "data",
            "gamification.json"
        )
        
        import json
        if os.path.exists(gam_file):
            with open(gam_file, "r") as f:
                gam_data = json.load(f)
                user_data = gam_data.get(child_id, {"points": 0, "level": 1, "badges": []})
        else:
            user_data = {"points": 0, "level": 1, "badges": []}
        
        return {
            "success": True,
            "childId": child_id,
            "points": user_data.get("points", 0),
            "level": user_data.get("level", 1),
            "badges": user_data.get("badges", [])
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch rewards: {str(e)}")


@app.post("/api/profile/analyze")
async def analyze_profile(request: ProfileRequest):
    """Analyze child profile and return personalized insights"""
    try:
        profile = profile_agent.run({"child_id": request.child_id})
        return {
            "success": True,
            "profile": profile,
            "reasoning": {
                "hobbies": f"Based on transaction analysis, identified interests in: {', '.join(profile.get('personalization', {}).get('hobbies', []))}",
                "subjects": f"Favorite subjects inferred: {', '.join(profile.get('personalization', {}).get('favoriteSubjects', []))}",
                "learningStyle": f"Learning style determined: {profile.get('personalization', {}).get('preferredLearningStyle', 'Unknown')}",
                "pocketMoney": f"Pocket money pattern: {profile.get('personalization', {}).get('pocketMoney', {}).get('frequency', 'Unknown')} - ₹{profile.get('personalization', {}).get('pocketMoney', {}).get('amount', 0)}"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Profile analysis failed: {str(e)}")


@app.post("/api/story/generate")
async def generate_story(request: StoryRequest):
    """Generate a personalized story based on profile"""
    try:
        story = story_agent.run({"profile": request.profile})
        return {
            "success": True,
            "story": story
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Story generation failed: {str(e)}")


@app.post("/api/quiz/generate")
async def generate_quiz(request: QuizRequest):
    """Generate a quiz based on the story"""
    try:
        quiz_input = {"story": request.story}
        if request.profile:
            quiz_input["profile"] = request.profile
        quiz = quiz_agent.run(quiz_input)
        return {
            "success": True,
            "quiz": quiz
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Quiz generation failed: {str(e)}")

