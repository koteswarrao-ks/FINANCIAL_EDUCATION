# backend/agents/story_agent.py

import os
import json
from openai import AzureOpenAI
from agno_mock import Agent
from agents.learning_progress import get_next_topic

# ---- RAG Dependencies ----
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

# Azure OpenAI client
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
    hobbies = profile["personalization"].get("hobbies", [])
    favorite_subjects = profile["personalization"].get("favoriteSubjects", [])
    hobby = hobbies[0] if hobbies else "general activities"
    pocket_money = profile["personalization"]["pocketMoney"]["amount"]
    learning_style = profile["personalization"]["preferredLearningStyle"]

    # 1️⃣ Get next topic
    concept = get_next_topic(child_id)
    if concept is None:
        return {
            "story": {
                "status": "completed",
                "message": "All financial learning topics completed."
            }
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

    # Format hobbies and favorite subjects for the prompt
    hobbies_text = ", ".join(hobbies) if hobbies else "general activities"
    subjects_text = ", ".join(favorite_subjects) if favorite_subjects else "general learning"
    
    user_prompt = f"""
Create a personalized financial education story for a child.

Child:
- Name: {name}
- Age: {age}
- Hobbies: {hobbies_text}
- Favorite Subjects: {subjects_text}
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
- Story must integrate: hobbies ({hobbies_text}), favorite subjects ({subjects_text}), and pocket money ₹{pocket_money}.
- Use examples and scenarios related to the child's favorite subjects to make the financial concept more relatable.
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
  "theme": "{hobbies_text}",
  "ragContextUsed": "{rag_context.replace('"', "'")}",
  "fullStoryText": "string",
  "panels": [
    {{"panelId": 1, "text": "string"}}
  ],
  "learningPoints": ["", "", ""]
}}
"""

    # 5️⃣ Call Azure OpenAI
    response = client.chat.completions.create(
        model=azure_openai_deployment,
        # Note: temperature parameter removed - Azure OpenAI model only supports default value
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    story_json = json.loads(response.choices[0].message.content)
    
    # Capture LLM call details
    from datetime import datetime
    full_prompt = f"System: {system_prompt}\n\nUser: {user_prompt}"
    llm_call_details = {
        "agent": "Story Agent",
        "timestamp": datetime.now().isoformat(),
        "input": {
            "child_id": child_id,
            "concept": concept,
            "difficulty": difficulty,
            "profile_summary": {
                "name": name,
                "age": age,
                "hobbies": hobbies,
                "favorite_subjects": favorite_subjects,
                "pocket_money": pocket_money,
                "learning_style": learning_style
            },
            "rag_context_length": len(rag_context),
            "rag_context_preview": rag_context[:500] + "..." if len(rag_context) > 500 else rag_context,
            "prompt": full_prompt[:1000] + "..." if len(full_prompt) > 1000 else full_prompt
        },
        "output": story_json,
        "reasoning": {
            "concept_selected": concept,
            "difficulty_level": difficulty,
            "personalization_applied": {
                "hobbies_integrated": hobbies_text,
                "subjects_integrated": subjects_text,
                "pocket_money_amount": pocket_money
            },
            "rag_chunks_retrieved": len(rag_chunks),
            "story_panels_generated": len(story_json.get("panels", []))
        }
    }
    
    # Return story with LLM call details
    return {
        "story": story_json,
        "llm_call_details": llm_call_details
    }


story_agent = Agent(func=story_agent_fn, name="StoryAgent")
