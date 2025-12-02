# backend/agents/story_agent.py

import os
import json
from openai import OpenAI
from agno_mock import Agent
from agents.learning_progress import get_next_topic

# ---- RAG Dependencies ----
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

# OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# ---- RAG Setup ----
BASE_DIR = os.path.dirname(os.path.dirname(__file__))  # backend/
RAG_DIR = os.path.join(BASE_DIR, "rag")
CHROMA_PATH = os.path.join(RAG_DIR, "chroma_store")

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={"device": "cpu"}
)

vectordb = Chroma(
    embedding_function=embeddings,
    persist_directory=CHROMA_PATH,
    collection_name="financial_kb"
)

retriever = vectordb.as_retriever(search_kwargs={"k": 2})


def story_agent_fn(input):
    """
    FINAL Story Agent:
    - Retrieves child's next topic from learning progress
    - Pulls authoritative financial concept text via RAG
    - Generates 4–6 panel story grounded ONLY in retrieved KB
    - Personalized using child's hobbies, learning style, pocket money
    - No hallucinations allowed beyond RAG context
    """

    profile = input["profile"]

    child_id = profile["childId"]
    name = profile["name"]
    age = profile["age"]
    hobby = profile["personalization"]["hobbies"][0]
    pocket_money = profile["personalization"]["pocketMoney"]["amount"]
    learning_style = profile["personalization"]["preferredLearningStyle"]

    # 1️⃣ Get next topic
    concept = get_next_topic(child_id)
    if concept is None:
        return {
            "status": "completed",
            "message": "All financial learning topics completed."
        }

    # 2️⃣ Difficulty
    difficulty = (
        "easy" if age <= 7 else
        "medium" if age <= 10 else
        "complex"
    )

    # 3️⃣ Retrieve authoritative KB via RAG
    docs = retriever.invoke(concept)
    rag_chunks = [d.page_content for d in docs]
    rag_context = "\n\n".join(rag_chunks)

    # 4️⃣ Prompts
    system_prompt = """
You are Buddy the Panda, a children’s financial education storyteller.

RESTRICTIONS:
- You MUST use only the RAG context as the financial knowledge source.
- You MUST NOT invent new financial definitions or rules beyond the RAG context.
- Creativity is allowed ONLY in storytelling, not financial teaching.
- Return ONLY valid JSON. No extra commentary.
"""

    user_prompt = f"""
Create a personalized financial education story for a child.

Child:
- Name: {name}
- Age: {age}
- Hobby: {hobby}
- Weekly Pocket Money: ₹{pocket_money}
- Learning Style: {learning_style}

Financial Concept to Teach: {concept}
Difficulty Level: {difficulty}

RAG Context (authoritative financial facts):
\"\"\" 
{rag_context}
\"\"\"

Story Requirements:
- Buddy the Panda is the narrator throughout the story.
- Story must be 4 to 6 panels (short scenes).
- Story must integrate: {hobby} and pocket money ₹{pocket_money}.
- All financial teaching MUST strictly come from RAG context.
- Include exactly 3 learningPoints that summarize the concept.
- Child-friendly, simple language.

Return JSON EXACTLY in this format:
{{
  "storyId": "story_{concept.lower()}_{child_id}",
  "childId": "{child_id}",
  "title": "{name}'s {concept} Adventure",
  "concept": "{concept}",
  "difficulty": "{difficulty}",
  "theme": "{hobby}",
  "ragContextUsed": "{rag_context.replace('"', "'")}",
  "fullStoryText": "string",
  "panels": [
    {{"panelId": 1, "text": "string"}}
  ],
  "learningPoints": ["", "", ""]
}}
"""

    # 5️⃣ Call OpenAI
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0.3,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    story_json = json.loads(response.choices[0].message.content)
    return story_json


story_agent = Agent(func=story_agent_fn, name="StoryAgent")
