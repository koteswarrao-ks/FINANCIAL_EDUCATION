from agno_mock import Agent
from agents.profile_agent import profile_agent
from agents.story_agent import story_agent
from agents.quiz_agent import quiz_agent
from agents.learning_progress import mark_topic_completed, load_progress
from agents.gamification_agent import gamification_agent

def orchestration_agent_fn(child_id: str):

    profile = profile_agent.run({"child_id": child_id})
    story = story_agent.run({"profile": profile})

    if story.get("status") == "completed":
        return {"message": "All topics completed", "progress": load_progress(child_id)}

    quiz = quiz_agent.run({"story": story, "profile": profile})

    return {
        "profile": profile,
        "story": story,
        "quiz": quiz,
        "progress": load_progress(child_id)
    }

orchestration_agent = Agent(func=orchestration_agent_fn, name="OrchestrationAgent")
