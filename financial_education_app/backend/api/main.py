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


class LoginRequest(BaseModel):
    username: str
    password: str

class ProfileRequest(BaseModel):
    child_id: str


class StoryRequest(BaseModel):
    profile: Dict[str, Any]


class QuizRequest(BaseModel):
    story: Dict[str, Any]
    profile: Optional[Dict[str, Any]] = None


class QuizSubmission(BaseModel):
    quizId: str
    concept: Optional[str] = None  # Concept name from quiz/story
    answers: Dict[int, str]  # question_id -> selected_answer
    correctAnswers: Dict[int, str]  # question_id -> correct_answer


@app.get("/")
def root():
    return {"message": "Financial Education API", "status": "running"}


@app.post("/api/login")
async def login(request: LoginRequest):
    """Login endpoint - validates username and password"""
    try:
        import requests
        MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")
        
        response = requests.post(
            f"{MCP_SERVER_URL}/login",
            json={"username": request.username, "password": request.password},
            timeout=5
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=401, detail="Invalid username or password")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")


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
        
        response = {
            "success": True,
            "completed": False,
            "profile": result.get("profile"),
            "story": result.get("story"),
            "quiz": result.get("quiz"),
            "progress": result.get("progress", {})
        }
        
        # Include LLM call details if available (from story or profile agent)
        if result.get("llm_call_details"):
            response["llm_call_details"] = result.get("llm_call_details")
        
        return response
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
        
        # Get concept from submission, or extract from quizId as fallback
        if submission.concept:
            concept = submission.concept
        else:
            # Fallback: extract from quizId
            # Format: quiz_{concept_lower}_{child_id}
            # Handle multi-word concepts (e.g., "value creation" or "value_creation")
            quiz_id_parts = submission.quizId.split("_")
            if len(quiz_id_parts) >= 3:
                # Reconstruct concept (parts between "quiz" and child_id)
                concept_parts = quiz_id_parts[1:-1]  # All parts except first and last
                concept = " ".join(word.title() for word in concept_parts)
            else:
                concept = quiz_id_parts[1].title() if len(quiz_id_parts) > 1 else "Unknown"
        
        # Match concept to actual topic name (handle variations)
        progress = load_progress(child_id)
        all_topics = progress.get("completedTopics", []) + progress.get("pendingTopics", [])
        # Find exact match or closest match
        matched_concept = concept
        for topic in all_topics:
            if topic.lower() == concept.lower() or concept.lower() in topic.lower() or topic.lower() in concept.lower():
                matched_concept = topic
                break
        concept = matched_concept
        
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
        import requests
        MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")
        response = requests.get(
            f"{MCP_SERVER_URL}/gamification/{child_id}",
            timeout=5
        )
        response.raise_for_status()
        user_data = response.json()
        
        return {
            "success": True,
            "childId": child_id,
            "points": user_data.get("points", 0),
            "level": user_data.get("level", 1),
            "badges": user_data.get("badges", [])
        }
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"MCP server communication failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch rewards: {str(e)}")

@app.get("/api/leaderboard")
async def get_leaderboard():
    """
    Get leaderboard with all users sorted by points (descending) with rankings
    """
    try:
        import requests
        MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")
        response = requests.get(
            f"{MCP_SERVER_URL}/leaderboard",
            timeout=5
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"MCP server communication failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch leaderboard: {str(e)}")


@app.post("/api/profile/analyze")
async def analyze_profile(request: ProfileRequest):
    """Analyze child profile and return personalized insights - optimized with fast path"""
    import asyncio
    import requests
    
    try:
        # FAST PATH: Check if preferences already exist - if so, return quick profile without LLM
        MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")
        
        try:
            # Check if preferences exist
            prefs_response = requests.get(
                f"{MCP_SERVER_URL}/profile_preferences/{request.child_id}",
                timeout=3
            )
            
            # If preferences exist and have data, use fast path
            if prefs_response.status_code == 200:
                existing_prefs = prefs_response.json()
                hobbies = existing_prefs.get("hobbies", [])
                subjects = existing_prefs.get("favoriteSubjects", [])
                
                # Fast path: if we have saved preferences, build profile quickly
                if hobbies or subjects:
                    # Get user profile for basic info
                    user_resp = requests.get(
                        f"{MCP_SERVER_URL}/user_profile/{request.child_id}",
                        timeout=3
                    )
                    if user_resp.status_code == 200:
                        user_data = user_resp.json()
                        basic = user_data.get("basicProfile", {})
                        
                        # Extract pocket money and infer learning style from transactions
                        transactions = user_data.get("transactions", [])
                        pocket_money_amount = 0
                        pocket_money_freq = "weekly"
                        learning_style = "visual"  # Default
                        
                        for txn in transactions:
                            # Extract pocket money
                            if txn.get("type") == "credit" and txn.get("category") == "Income":
                                pocket_money_amount = txn.get("amount", 0)
                                desc_lower = txn.get("description", "").lower()
                                if "weekly" in desc_lower:
                                    pocket_money_freq = "weekly"
                                elif "monthly" in desc_lower:
                                    pocket_money_freq = "monthly"
                            
                            # Infer learning style from transaction patterns
                            category = txn.get("category", "").lower()
                            description = txn.get("description", "").lower()
                            merchant = txn.get("merchant", "").lower()
                            
                            # Visual learning indicators
                            if any(word in category or word in description or word in merchant 
                                   for word in ["art", "drawing", "painting", "visual", "video", "youtube", "photo", "image"]):
                                learning_style = "visual"
                            
                            # Auditory learning indicators
                            elif any(word in category or word in description or word in merchant 
                                     for word in ["music", "audio", "podcast", "guitar", "piano", "sound"]):
                                learning_style = "auditory"
                            
                            # Kinesthetic learning indicators
                            elif any(word in category or word in description or word in merchant 
                                     for word in ["sports", "physical", "games", "toys", "building", "craft", "hands-on"]):
                                learning_style = "kinesthetic"
                            
                            # Reading/Writing learning indicators
                            elif any(word in category or word in description or word in merchant 
                                     for word in ["book", "writing", "stationery", "notebook", "pen", "reading", "text"]):
                                learning_style = "reading/writing"
                        
                        # Build quick profile without LLM
                        quick_profile = {
                            "childId": request.child_id,
                            "name": basic.get("name", "Unknown"),
                            "age": basic.get("age", 0),
                            "grade": basic.get("grade", ""),
                            "country": basic.get("country", "India"),
                            "personalization": {
                                "hobbies": hobbies,
                                "favoriteSubjects": subjects,
                                "preferredLearningStyle": learning_style,  # Inferred from transactions
                                "pocketMoney": {
                                    "frequency": pocket_money_freq,
                                    "amount": pocket_money_amount,
                                    "currency": "INR"
                                }
                            }
                        }
                        
                        return {
                            "success": True,
                            "profile": quick_profile,
                            "reasoning": {
                                "hobbies": f"Saved hobbies: {', '.join(hobbies) if hobbies else 'None'}",
                                "subjects": f"Saved favorite subjects: {', '.join(subjects) if subjects else 'None'}",
                                "learningStyle": "Using default learning style (visual)",
                                "pocketMoney": f"Pocket money: {pocket_money_freq} - ₹{pocket_money_amount}"
                            },
                            "llm_call_details": {
                                "agent": "Profile Agent",
                                "timestamp": None,
                                "input": {"fast_path": True, "child_id": request.child_id},
                                "output": None,
                                "reasoning": "Fast path: Using saved preferences, skipping LLM call",
                                "error": None
                            }
                        }
        except Exception as e:
            # If fast path fails, continue to LLM path
            print(f"Fast path failed, using LLM: {e}")
        
        # SLOW PATH: Run profile agent with LLM (only if fast path didn't work)
        try:
            # Use asyncio to add timeout protection
            profile_result = await asyncio.wait_for(
                asyncio.to_thread(profile_agent.run, {"child_id": request.child_id}),
                timeout=150.0  # 150 second timeout for LLM calls
            )
        except asyncio.TimeoutError:
            # Return error response if timeout
            return {
                "success": False,
                "profile": None,
                "reasoning": None,
                "llm_call_details": {
                    "agent": "Profile Agent",
                    "error": {
                        "error_type": "TimeoutError",
                        "error_message": "Profile analysis timed out after 150 seconds. The LLM call may be taking longer than expected.",
                        "endpoint": os.getenv("AZURE_OPENAI_ENDPOINT", "N/A"),
                        "deployment": os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME", "N/A")
                    }
                }
            }
        
        # Continue with normal processing
        
        # Handle both old format (dict) and new format (dict with profile key)
        if isinstance(profile_result, dict) and "profile" in profile_result:
            profile = profile_result.get("profile")
            llm_call_details = profile_result.get("llm_call_details", {})
        else:
            profile = profile_result
            llm_call_details = {}
        
        # Check if there was an error in LLM call
        has_error = llm_call_details and llm_call_details.get("error") is not None
        
        # Auto-save analyzed preferences if they don't exist yet (only if no error)
        if not has_error:
            import requests
            MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")
            
            try:
                # Check if preferences already exist
                prefs_response = requests.get(
                    f"{MCP_SERVER_URL}/profile_preferences/{request.child_id}",
                    timeout=5
                )
                
                # If preferences don't exist or are empty, save the analyzed ones
                if prefs_response.status_code == 200:
                    existing_prefs = prefs_response.json()
                    hobbies = existing_prefs.get("hobbies", [])
                    subjects = existing_prefs.get("favoriteSubjects", [])
                    
                    # Only auto-save if preferences are empty (first time analysis)
                    # Save even if analyzed arrays are empty, so the entry exists
                    if not hobbies and not subjects:
                        analyzed_hobbies = profile.get('personalization', {}).get('hobbies', [])
                        analyzed_subjects = profile.get('personalization', {}).get('favoriteSubjects', [])
                        
                        # Always save on first analysis, even if arrays are empty
                        preferences = {
                            "childId": request.child_id,
                            "hobbies": analyzed_hobbies if analyzed_hobbies else [],
                            "favoriteSubjects": analyzed_subjects if analyzed_subjects else []
                        }
                        
                        requests.post(
                            f"{MCP_SERVER_URL}/profile_preferences/{request.child_id}",
                            json=preferences,
                            timeout=5
                        )
            except Exception as e:
                # If auto-save fails, continue anyway (not critical)
                print(f"Warning: Could not auto-save preferences: {e}")
        
        # Build reasoning (handle empty values if there was an error)
        hobbies_list = profile.get('personalization', {}).get('hobbies', [])
        subjects_list = profile.get('personalization', {}).get('favoriteSubjects', [])
        
        response = {
            "success": not has_error,  # Set success to False if there was an error
            "profile": profile,
            "reasoning": {
                "hobbies": f"Based on transaction analysis, identified interests in: {', '.join(hobbies_list) if hobbies_list else 'Unable to analyze - LLM error'}" if not has_error else "LLM call failed - unable to analyze hobbies",
                "subjects": f"Favorite subjects inferred: {', '.join(subjects_list) if subjects_list else 'Unable to analyze - LLM error'}" if not has_error else "LLM call failed - unable to analyze subjects",
                "learningStyle": f"Learning style determined: {profile.get('personalization', {}).get('preferredLearningStyle', 'Unknown')}" if not has_error else "LLM call failed - unable to determine learning style",
                "pocketMoney": f"Pocket money pattern: {profile.get('personalization', {}).get('pocketMoney', {}).get('frequency', 'Unknown')} - ₹{profile.get('personalization', {}).get('pocketMoney', {}).get('amount', 0)}" if not has_error else "LLM call failed - unable to analyze pocket money"
            },
            "llm_call_details": llm_call_details
        }
        
        # If there was an error, include error message in response but don't raise exception
        # This allows UI to display the error in LLM panel
        if has_error:
            error_info = llm_call_details.get("error", {})
            error_msg = f"LLM call failed: {error_info.get('error_type', 'Unknown')} - {error_info.get('error_message', 'Unknown error')}"
            response["error_message"] = error_msg
            # Return 200 with error details instead of 500, so UI can show LLM panel with error
            return response
        
        return response
    except Exception as e:
        # If profile_agent raised an exception (not caught internally), still try to return what we have
        error_msg = str(e)
        raise HTTPException(status_code=500, detail=f"Profile analysis failed: {error_msg}")


@app.post("/api/story/generate")
async def generate_story(request: StoryRequest):
    """Generate a personalized story based on profile"""
    try:
        story_result = story_agent.run({"profile": request.profile})
        # Handle both old format (dict) and new format (dict with story key)
        if isinstance(story_result, dict) and "story" in story_result:
            story = story_result.get("story")
            llm_call_details = story_result.get("llm_call_details")
        else:
            story = story_result
            llm_call_details = None
        
        response = {
            "success": True,
            "story": story
        }
        
        if llm_call_details:
            response["llm_call_details"] = llm_call_details
        
        return response
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


class ProfilePreferencesRequest(BaseModel):
    child_id: str
    hobbies: List[str]
    favoriteSubjects: List[str]


@app.post("/api/profile/preferences")
async def update_profile_preferences(request: ProfilePreferencesRequest):
    """Update profile preferences (hobbies and favorite subjects)"""
    try:
        import requests
        MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")
        
        preferences = {
            "childId": request.child_id,
            "hobbies": request.hobbies,
            "favoriteSubjects": request.favoriteSubjects
        }
        
        response = requests.post(
            f"{MCP_SERVER_URL}/profile_preferences/{request.child_id}",
            json=preferences,
            timeout=5
        )
        response.raise_for_status()
        
        return {
            "success": True,
            "message": "Profile preferences updated successfully",
            "preferences": preferences
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update profile preferences: {str(e)}")


@app.get("/api/profile/preferences/{child_id}")
async def get_profile_preferences(child_id: str):
    """Get profile preferences (hobbies and favorite subjects)"""
    try:
        import requests
        MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")
        
        response = requests.get(
            f"{MCP_SERVER_URL}/profile_preferences/{child_id}",
            timeout=5
        )
        response.raise_for_status()
        
        return {
            "success": True,
            "preferences": response.json()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get profile preferences: {str(e)}")

