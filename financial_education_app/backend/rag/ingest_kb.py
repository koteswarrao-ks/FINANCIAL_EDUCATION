import json
import os
from pathlib import Path

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.documents import Document

BASE_DIR = Path(__file__).resolve().parent
KB_PATH = BASE_DIR / "financial_concepts.json"
CHROMA_DIR = BASE_DIR / "chroma_store"

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={"device": "cpu"}
)

def main():
    with open(KB_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    docs = []
    for item in data:
        metadata = {
            "topic": item["topic"],
            "id": item["id"]
        }
        # Include source information if available (from PDFs)
        if "source" in item:
            metadata["source"] = item["source"]
        if "grade" in item:
            metadata["grade"] = item["grade"]
        
        docs.append(
            Document(
                page_content=item["content"],
                metadata=metadata
            )
        )

    vectordb = Chroma.from_documents(
        documents=docs,
        embedding=embeddings,
        persist_directory=str(CHROMA_DIR),
        collection_name="financial_concepts"  # Fixed: Match profile_agent collection name
    )

    vectordb.persist()
    print("✅ Financial KB ingested into Chroma at:", CHROMA_DIR)

if __name__ == "__main__":
    main()
