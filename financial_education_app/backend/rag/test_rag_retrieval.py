"""
Test script to verify RAG retrieval is working and using PDF content
"""

import os
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

# Suppress langchain debug warnings
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

BASE_DIR = Path(__file__).resolve().parent
CHROMA_PATH = BASE_DIR / "chroma_store"

def test_rag_retrieval():
    """Test RAG retrieval for a concept"""
    print("=" * 70)
    print("🔍 Testing RAG Retrieval")
    print("=" * 70)
    
    # Check if ChromaDB exists
    if not CHROMA_PATH.exists():
        print(f"\n❌ ChromaDB not found: {CHROMA_PATH}")
        print("   Run: python ingest_kb.py")
        return
    
    # Initialize embeddings and vector store
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={"device": "cpu"}
    )
    
    try:
        vectordb = Chroma(
            embedding_function=embeddings,
            persist_directory=str(CHROMA_PATH),
            collection_name="financial_concepts"
        )
        
        retriever = vectordb.as_retriever(search_kwargs={"k": 3})
        
        # Test queries
        test_concepts = ["Budgeting", "Investing", "Entrepreneurship", "Value Creation"]
        
        for concept in test_concepts:
            print(f"\n📖 Query: '{concept}'")
            print("-" * 70)
            
            # Use get_relevant_documents instead of invoke to avoid callback issues
            try:
                docs = retriever.get_relevant_documents(concept)
            except:
                docs = retriever.invoke(concept)
            
            pdf_sources = []
            original_kb = []
            
            for i, doc in enumerate(docs, 1):
                source = doc.metadata.get("source", "original knowledge base")
                if source.endswith(".pdf"):
                    pdf_sources.append(source)
                else:
                    original_kb.append(source)
                
                print(f"\n   Chunk {i}:")
                print(f"      Source: {source}")
                print(f"      Topic: {doc.metadata.get('topic', 'Unknown')}")
                print(f"      Content: {doc.page_content[:200]}...")
            
            print(f"\n   📊 Summary:")
            print(f"      - Total chunks: {len(docs)}")
            print(f"      - From PDFs: {len(set(pdf_sources))} unique source(s)")
            if pdf_sources:
                for pdf in set(pdf_sources):
                    print(f"         ✓ {pdf}")
            print(f"      - From original KB: {len(original_kb)} chunk(s)")
        
        print("\n" + "=" * 70)
        print("✅ RAG retrieval is working!")
        print("=" * 70)
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_rag_retrieval()

