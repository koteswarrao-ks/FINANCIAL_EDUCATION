# backend/agents/story_agent.py

import os
import json
from openai import AzureOpenAI
from agno_mock import Agent
from agents.learning_progress import get_next_topic
from agents.agno_tools import retrieve_financial_concepts_by_topic

# Helper to call Agno tools
def call_agno_tool(tool, **kwargs):
    """Helper to call Agno tool via entrypoint"""
    return tool.entrypoint(**kwargs)

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

    # 3️⃣ Retrieve authoritative KB via RAG using tool
    print(f"\n🔍 RAG Retrieval for concept: '{concept}'")
    
    # Initialize variables (will be set in try block)
    retrieved_docs = []
    rag_chunks = []
    source_attributions = []
    pdf_sources_used = set()
    original_kb_count = 0
    rag_context = ""
    
    try:
        # Use Agno RAG tool to retrieve concepts by topic
        retrieved_docs = call_agno_tool(retrieve_financial_concepts_by_topic, topic=concept, k=5)
        
        # Handle tool response format
        if not retrieved_docs or (isinstance(retrieved_docs, list) and len(retrieved_docs) > 0 and "error" in retrieved_docs[0]):
            error_msg = retrieved_docs[0].get("error", "Unknown error") if retrieved_docs else "No documents retrieved"
            raise RuntimeError(f"RAG retrieval failed: {error_msg}")
        
        # Process retrieved documents
        rag_chunks = []
        source_attributions = []
        pdf_sources_used = set()
        original_kb_count = 0
        
        for doc_data in retrieved_docs:
            content = doc_data.get("content", "")
            metadata = doc_data.get("metadata", {})
            source_info = doc_data.get("source", "original knowledge base")
            topic = doc_data.get("topic", concept)
            entry_id = doc_data.get("entry_id", metadata.get("id", "unknown"))
            grade = metadata.get("grade", "N/A")
            page = metadata.get("page", "N/A")
            content_preview = content[:300] + "..." if len(content) > 300 else content
            
            # Build detailed source attribution
            if source_info.startswith("Class_"):
                pdf_sources_used.add(source_info)
                source_attributions.append({
                    "type": "PDF",
                    "source": source_info,
                    "topic": topic,
                    "entryId": entry_id,
                    "contentLength": len(content),
                    "contentPreview": content_preview,
                    "metadata": {
                        "grade": grade,
                        "page": page
                    }
                })
                rag_chunks.append(f"[Source: {source_info} | Topic: {topic} | Grade: {grade} | Entry ID: {entry_id}]\n{content}")
            else:
                original_kb_count += 1
                source_attributions.append({
                    "type": "Knowledge Base",
                    "source": "financial_concepts.json",
                    "topic": topic,
                    "entryId": entry_id,
                    "contentLength": len(content),
                    "contentPreview": content_preview
                })
                rag_chunks.append(f"[Source: {source_info} | Topic: {topic} | Entry ID: {entry_id}]\n{content}")
        
        rag_context = "\n\n".join(rag_chunks)
        
        # Log which sources were used
        print(f"📚 Retrieved {len(retrieved_docs)} chunks:")
        print(f"   - From PDFs: {len(pdf_sources_used)} source(s)")
        if pdf_sources_used:
            for pdf_source in pdf_sources_used:
                print(f"      ✓ {pdf_source}")
        print(f"   - From original KB: {original_kb_count} chunk(s)")
        print(f"   - Total context length: {len(rag_context)} characters")
        
    except Exception as e:
        print(f"   ⚠️  Error in RAG retrieval: {e}")
        raise RuntimeError(f"RAG retrieval failed: {type(e).__name__}: {str(e)}") from e

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
- Story must integrate: hobbies ({hobbies_text}) and favorite subjects ({subjects_text}).
- Use examples and scenarios related to the child's favorite subjects to make the financial concept more relatable.
- All financial teaching MUST strictly come from RAG context.
- Include exactly 3 learningPoints that summarize the concept.
- Child-friendly, simple language.
- Do NOT mention or use pocket money amounts in the story.

Return JSON EXACTLY in this format:
{{
  "storyId": "story_{concept.lower()}_{child_id}",
  "childId": "{child_id}",
  "title": "{name}'s {concept} Adventure",
  "concept": "{concept}",
  "difficulty": "{difficulty}",
  "theme": "{hobbies_text}",
  "fullStoryText": "string",
  "panels": [
    {{"panelId": 1, "text": "string"}}
  ],
  "learningPoints": ["", "", ""]
}}

Note: Source attribution will be added automatically by the system.
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
    
    # Add source attributions to story
    story_json["sourceAttributions"] = source_attributions
    story_json["knowledgeBaseUsed"] = {
        "totalSources": len(source_attributions),
        "pdfSources": [s["source"] for s in source_attributions if s["type"] == "PDF"],
        "kbSources": [s["source"] for s in source_attributions if s["type"] == "Knowledge Base"]
    }
    
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
            "rag_context_preview": rag_context[:1000] + "..." if len(rag_context) > 1000 else rag_context,
            "rag_context_with_proof": rag_context,  # Full RAG context with source attribution
            "tools_used": ["get_next_topic", "retrieve_financial_concepts_by_topic"],
            "source_breakdown": {
                "total_chunks": len(retrieved_docs),
                "pdf_chunks": len([s for s in source_attributions if s["type"] == "PDF"]),
                "kb_chunks": len([s for s in source_attributions if s["type"] == "Knowledge Base"]),
                "pdf_files_used": list(pdf_sources_used),
                "detailed_sources": [
                    {
                        "source": attr["source"],
                        "type": attr["type"],
                        "topic": attr["topic"],
                        "entryId": attr["entryId"],
                        "contentPreview": attr["contentPreview"],
                        "contentLength": attr["contentLength"],
                        "grade": attr.get("grade", "N/A") if attr["type"] == "PDF" else None,
                        "page": attr.get("page", "N/A") if attr["type"] == "PDF" else None
                    }
                    for attr in source_attributions
                ]
            },
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
        },
        "source_proof": {
            "rag_retrieval_summary": {
                "total_chunks": len(retrieved_docs),
                "pdf_sources_count": len(pdf_sources_used),
                "original_kb_count": original_kb_count,
                "pdf_files_list": list(pdf_sources_used),
                "kb_files_list": ["financial_concepts.json"] if original_kb_count > 0 else []
            },
            "detailed_source_attributions": source_attributions,
            "rag_context_with_sources": rag_context,  # Full context showing [Source: ...] tags
            "verification_statement": f"Story generated using {len(source_attributions)} knowledge base entries: {len(pdf_sources_used)} from PDFs ({', '.join(sorted(pdf_sources_used)) if pdf_sources_used else 'none'}) and {original_kb_count} from original knowledge base (financial_concepts.json)"
        }
    }
    
    # Return story with LLM call details and source attributions
    return {
        "story": story_json,
        "llm_call_details": llm_call_details
    }


story_agent = Agent(func=story_agent_fn, name="StoryAgent")
