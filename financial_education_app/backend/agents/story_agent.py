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
    collection_name="financial_concepts"  # Match ingest_kb.py collection name
)

# Retrieve more documents to get diverse sources (original KB + PDFs)
# Increased k from 2 to 5 to ensure we get a mix of sources
retriever = vectordb.as_retriever(search_kwargs={"k": 5})


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

    # 3️⃣ Retrieve authoritative KB via RAG (from both original KB and PDFs)
    print(f"\n🔍 RAG Retrieval for concept: '{concept}'")
    
    # Strategy: Get ALL entries matching the exact topic, then randomly select
    # This ensures we get all 39 "Earning Through Skills" entries, not just top similarity matches
    import random
    
    try:
        # Method 1: Try to get ALL entries by using a very large k and filtering by topic
        # Retrieve a large number to ensure we get all matching entries
        all_docs = vectordb.similarity_search_with_score(concept, k=100)
        all_docs = [doc for doc, score in all_docs]  # Extract just the documents
        
        # Filter to ONLY entries that match the exact topic (case-insensitive)
        topic_matched_docs = [
            d for d in all_docs 
            if d.metadata.get("topic", "").lower() == concept.lower()
        ]
        
        print(f"   📊 Found {len(topic_matched_docs)} entries matching topic '{concept}'")
        
        if len(topic_matched_docs) > 0:
            # Randomly shuffle and select from ALL topic-matched entries
            random.shuffle(topic_matched_docs)
            # Select up to 5 random entries from all matching topic entries
            docs = topic_matched_docs[:5]
            print(f"   ✅ Randomly selected {len(docs)} entries from {len(topic_matched_docs)} total entries for topic '{concept}'")
            
            # Log which entries were selected for debugging
            selected_ids = [d.metadata.get("id", "unknown") for d in docs]
            print(f"   📝 Selected entry IDs: {', '.join(selected_ids)}")
        else:
            # Fallback: if no exact topic match, use standard retrieval
            print(f"   ⚠️  No exact topic match found, using standard retrieval")
            docs = retriever.invoke(concept)
            
    except Exception as e:
        # Fallback to standard retrieval if similarity_search_with_score fails
        print(f"   ⚠️  Error in topic-filtered retrieval: {e}, using standard retrieval")
        try:
            # Try alternative: use retriever with large k
            retriever_large = vectordb.as_retriever(search_kwargs={"k": 100})
            all_docs = retriever_large.invoke(concept)
            topic_matched_docs = [
                d for d in all_docs 
                if d.metadata.get("topic", "").lower() == concept.lower()
            ]
            if topic_matched_docs:
                random.shuffle(topic_matched_docs)
                docs = topic_matched_docs[:5]
                print(f"   ✅ Randomly selected {len(docs)} entries from {len(topic_matched_docs)} total (fallback method)")
            else:
                docs = retriever.invoke(concept)
        except:
            docs = retriever.invoke(concept)
    
    rag_chunks = []
    source_attributions = []  # Track detailed source information for proof
    pdf_sources_used = set()
    original_kb_count = 0
    
    for d in docs:
        source_info = d.metadata.get("source", "original knowledge base")
        topic = d.metadata.get("topic", concept)
        entry_id = d.metadata.get("id", "unknown")
        grade = d.metadata.get("grade", "N/A")
        page = d.metadata.get("page", "N/A")
        content_preview = d.page_content[:300] + "..." if len(d.page_content) > 300 else d.page_content
        
        # Build detailed source attribution for proof
        if source_info.startswith("Class_"):
            pdf_sources_used.add(source_info)
            source_attributions.append({
                "type": "PDF",
                "source": source_info,
                "topic": topic,
                "entryId": entry_id,
                "contentLength": len(d.page_content),
                "contentPreview": content_preview,
                "metadata": {
                    "grade": grade,
                    "page": page
                }
            })
            # Enhanced RAG chunk with detailed PDF info: PDF name, Topic, Grade, Entry ID
            rag_chunks.append(f"[Source: {source_info} | Topic: {topic} | Grade: {grade} | Entry ID: {entry_id}]\n{d.page_content}")
        else:
            original_kb_count += 1
            source_attributions.append({
                "type": "Knowledge Base",
                "source": "financial_concepts.json",
                "topic": topic,
                "entryId": entry_id,
                "contentLength": len(d.page_content),
                "contentPreview": content_preview
            })
            # Enhanced RAG chunk with KB info: Source, Topic, Entry ID
            rag_chunks.append(f"[Source: {source_info} | Topic: {topic} | Entry ID: {entry_id}]\n{d.page_content}")
    
    rag_context = "\n\n".join(rag_chunks)
    
    # Log which sources were used
    print(f"📚 Retrieved {len(docs)} chunks:")
    print(f"   - From PDFs: {len(pdf_sources_used)} source(s)")
    if pdf_sources_used:
        for pdf_source in pdf_sources_used:
            print(f"      ✓ {pdf_source}")
    print(f"   - From original KB: {original_kb_count} chunk(s)")
    print(f"   - Total context length: {len(rag_context)} characters")

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
            "source_breakdown": {
                "total_chunks": len(docs),
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
                "total_chunks": len(docs),
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
