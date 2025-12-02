import os
import json
import requests
from agno_mock import Agent
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
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

    child_id = story["childId"]
    concept = story["concept"]
    difficulty = story["difficulty"]
    story_text = story["fullStoryText"]

    hobby = profile["personalization"]["hobbies"][0]
    learning_style = profile["personalization"]["preferredLearningStyle"]
    pocket_money = profile["personalization"]["pocketMoney"]["amount"]

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
        model="gpt-4o-mini",
        temperature=0.3,
        response_format={"type": "json_object"},
        messages=[{"role":"system","content":system_prompt},{"role":"user","content":user_prompt}]
    )

    return json.loads(response.choices[0].message.content)

quiz_agent = Agent(func=quiz_agent_fn, name="QuizAgent")
