"""Test RAG retrieval diversity for Earning Through Skills"""

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
CHROMA_PATH = BASE_DIR / "chroma_store"

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={"device": "cpu"}
)

vectordb = Chroma(
    embedding_function=embeddings,
    persist_directory=str(CHROMA_PATH),
    collection_name="financial_concepts"
)

# Test with similarity search (current)
print("🔍 Testing Similarity Search (k=5):")
retriever_sim = vectordb.as_retriever(search_kwargs={"k": 5})
docs_sim = retriever_sim.invoke("Earning Through Skills")
print(f"Retrieved {len(docs_sim)} docs")
pdf_count = 0
kb_count = 0
for i, doc in enumerate(docs_sim, 1):
    source = doc.metadata.get("source", "unknown")
    entry_id = doc.metadata.get("id", "unknown")
    if source.startswith("Class_"):
        pdf_count += 1
    else:
        kb_count += 1
    print(f"  {i}. {entry_id} from {source}")
print(f"   PDF entries: {pdf_count}, KB entries: {kb_count}")

print("\n🔍 Testing MMR Search (k=5, fetch_k=20):")
try:
    retriever_mmr = vectordb.as_retriever(
        search_kwargs={"k": 5, "fetch_k": 20},
        search_type="mmr"
    )
    docs_mmr = retriever_mmr.invoke("Earning Through Skills")
    print(f"Retrieved {len(docs_mmr)} docs")
    pdf_count = 0
    kb_count = 0
    for i, doc in enumerate(docs_mmr, 1):
        source = doc.metadata.get("source", "unknown")
        entry_id = doc.metadata.get("id", "unknown")
        if source.startswith("Class_"):
            pdf_count += 1
        else:
            kb_count += 1
        print(f"  {i}. {entry_id} from {source}")
    print(f"   PDF entries: {pdf_count}, KB entries: {kb_count}")
except Exception as e:
    print(f"❌ MMR not supported: {e}")
    print("Using similarity search with k=5 instead")

