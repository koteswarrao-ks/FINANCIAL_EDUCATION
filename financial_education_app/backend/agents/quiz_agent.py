import os
import json
import requests
from agno_mock import Agent
from openai import AzureOpenAI

# Azure OpenAI configuration
azure_openai_api_key = os.getenv("AZURE_OPENAI_API_KEY")
azure_openai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
azure_openai_api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-15-preview")
azure_openai_deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME", "gpt-4o-mini")

if not azure_openai_api_key:
    raise ValueError("AZURE_OPENAI_API_KEY must be set in environment variables")
if not azure_openai_endpoint:
    raise ValueError("AZURE_OPENAI_ENDPOINT must be set in environment variables")
if not azure_openai_deployment:
    raise ValueError("AZURE_OPENAI_DEPLOYMENT_NAME must be set in environment variables")

# Normalize endpoint URL (remove trailing slash if present, ensure https)
if azure_openai_endpoint:
    azure_openai_endpoint = azure_openai_endpoint.rstrip('/')
    if not azure_openai_endpoint.startswith("http"):
        azure_openai_endpoint = f"https://{azure_openai_endpoint}"

client = AzureOpenAI(
    api_key=azure_openai_api_key,
    api_version=azure_openai_api_version,
    azure_endpoint=azure_openai_endpoint,
    timeout=60.0,  # 60 second timeout
    max_retries=3  # Retry up to 3 times
)

MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:5001")

def fetch_quiz_history(child_id):
    try:
        resp = requests.get(f"{MCP_SERVER_URL}/quiz_history/{child_id}", timeout=5)
        return resp.json()
    except:
        return {}

def quiz_agent_fn(input):

    story = input["story"]
    profile = input.get("profile")  # Make profile optional

    child_id = story.get("childId", "kid_001")
    concept = story.get("concept", "Financial Education")
    difficulty = story.get("difficulty", "medium")  # Default to medium if not present
    story_text = story.get("fullStoryText", "")

    # Handle optional profile with defaults
    if profile and "personalization" in profile:
        hobbies = profile["personalization"].get("hobbies", [])
        hobby = hobbies[0] if hobbies else "general activities"
        learning_style = profile["personalization"].get("preferredLearningStyle", "visual")
        pocket_money = profile["personalization"].get("pocketMoney", {}).get("amount", 100)
    else:
        hobby = "general activities"
        learning_style = "visual"
        pocket_money = 100

    quiz_history = fetch_quiz_history(child_id)

    weak = quiz_history.get("weakAreas", [])
    strong = quiz_history.get("strongAreas", [])

    system_prompt = """
You generate financial quizzes for children. 
Rules:
- MUST use ONLY the story text as source of truth.
- Personalize based on hobby, learning style, pocket money.
- Modify difficulty using quiz history.
- Reinforce child's weak areas.
- 3–5 questions, 4 options each.
- Return ONLY valid JSON.
"""

    user_prompt = f"""
Create a quiz for the concept: {concept}

Weak Areas: {weak}
Strong Areas: {strong}

Story:
\"\"\" 
{story_text}
\"\"\"

Child:
- Hobby: {hobby}
- Learning Style: {learning_style}
- Pocket Money: ₹{pocket_money}

Return JSON:
{{
  "quizId": "quiz_{concept.lower()}_{child_id}",
  "childId": "{child_id}",
  "concept": "{concept}",
  "difficulty": "{difficulty}",
  "adaptiveReason": "string",
  "questions": [
    {{
      "id": 1,
      "question": "string",
      "options": ["A","B","C","D"],
      "correctAnswer": "string"
    }}
  ],
  "adaptiveMetadata": {{
      "weakAreasReinforced": [],
      "difficultyAdjusted": "string"
  }}
}}
"""

    response = client.chat.completions.create(
        model=azure_openai_deployment,
        # Note: temperature parameter removed - Azure OpenAI model only supports default value
        response_format={"type": "json_object"},
        messages=[{"role":"system","content":system_prompt},{"role":"user","content":user_prompt}]
    )

    return json.loads(response.choices[0].message.content)

quiz_agent = Agent(func=quiz_agent_fn, name="QuizAgent")
