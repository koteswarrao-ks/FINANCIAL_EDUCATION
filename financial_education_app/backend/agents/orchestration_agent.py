from agno_mock import Agent
from agents.profile_agent import profile_agent
from agents.story_agent import story_agent
from agents.quiz_agent import quiz_agent
from agents.learning_progress import mark_topic_completed, load_progress
from agents.gamification_agent import gamification_agent

def orchestration_agent_fn(child_id: str):

    profile_result = profile_agent.run({"child_id": child_id})
    # Handle both old format (dict) and new format (dict with profile key)
    if isinstance(profile_result, dict) and "profile" in profile_result:
        profile = profile_result.get("profile")
        profile_llm_details = profile_result.get("llm_call_details")
    else:
        profile = profile_result
        profile_llm_details = None
    
    story_result = story_agent.run({"profile": profile})
    # Handle both old format (dict) and new format (dict with story key)
    if isinstance(story_result, dict) and "story" in story_result:
        story = story_result.get("story")
        story_llm_details = story_result.get("llm_call_details")
    else:
        story = story_result
        story_llm_details = None

    if story.get("status") == "completed":
        return {"message": "All topics completed", "progress": load_progress(child_id)}

    quiz = quiz_agent.run({"story": story, "profile": profile})

    result = {
        "profile": profile,
        "story": story,
        "quiz": quiz,
        "progress": load_progress(child_id)
    }
    
    # Attach LLM call details if available (prioritize story agent as it's the latest)
    if story_llm_details:
        result["llm_call_details"] = story_llm_details
    elif profile_llm_details:
        result["llm_call_details"] = profile_llm_details
    
    return result

orchestration_agent = Agent(func=orchestration_agent_fn, name="OrchestrationAgent")
