"""
Verification script to check if PDF content is in the knowledge base
and being used by the RAG system.
"""

import json
import os
from pathlib import Path
from collections import Counter

BASE_DIR = Path(__file__).resolve().parent
KB_PATH = BASE_DIR / "financial_concepts.json"
CHROMA_DIR = BASE_DIR / "chroma_store"
PDF_DIR = BASE_DIR / "source_pdfs"

def check_pdf_content_in_kb():
    """Check if PDF content is in the knowledge base"""
    print("=" * 70)
    print("📚 PDF Content Verification")
    print("=" * 70)
    
    # 1. Check if financial_concepts.json exists
    if not KB_PATH.exists():
        print(f"\n❌ Knowledge base file not found: {KB_PATH}")
        print("   Run: python extract_pdf_content.py")
        return
    
    # 2. Load knowledge base
    with open(KB_PATH, 'r', encoding='utf-8') as f:
        kb_data = json.load(f)
    
    print(f"\n✅ Knowledge base loaded: {len(kb_data)} entries")
    
    # 3. Count sources
    sources = Counter()
    for entry in kb_data:
        source = entry.get("source", "original knowledge base")
        sources[source] += 1
    
    print(f"\n📊 Content Sources:")
    print(f"   {'Source':<40} {'Entries':<10}")
    print(f"   {'-'*40} {'-'*10}")
    for source, count in sources.most_common():
        print(f"   {source:<40} {count:<10}")
    
    # 4. Check PDF files
    print(f"\n📄 PDF Files in source_pdfs/:")
    if PDF_DIR.exists():
        pdf_files = list(PDF_DIR.glob("*.pdf"))
        if pdf_files:
            for pdf_file in sorted(pdf_files):
                pdf_name = pdf_file.name
                count = sources.get(pdf_name, 0)
                status = "✅" if count > 0 else "❌"
                print(f"   {status} {pdf_name:<35} {count:>5} entries")
        else:
            print("   ❌ No PDF files found")
    else:
        print(f"   ❌ PDF directory not found: {PDF_DIR}")
    
    # 5. Check ChromaDB
    print(f"\n🗄️  ChromaDB Status:")
    if CHROMA_DIR.exists():
        print(f"   ✅ ChromaDB directory exists: {CHROMA_DIR}")
        print(f"   💡 To verify ChromaDB has PDF content, run a test query")
    else:
        print(f"   ❌ ChromaDB not found. Run: python ingest_kb.py")
    
    # 6. Sample entries from PDFs
    print(f"\n📝 Sample PDF Content Entries:")
    pdf_entries = [e for e in kb_data if e.get("source", "").endswith(".pdf")]
    if pdf_entries:
        print(f"   Showing 3 random entries from PDFs:")
        import random
        for i, entry in enumerate(random.sample(pdf_entries, min(3, len(pdf_entries))), 1):
            print(f"\n   Entry {i}:")
            print(f"      Source: {entry.get('source', 'Unknown')}")
            print(f"      Topic: {entry.get('topic', 'Unknown')}")
            print(f"      Content preview: {entry.get('content', '')[:150]}...")
    else:
        print("   ❌ No PDF entries found in knowledge base")
        print("   💡 Run: python extract_pdf_content.py")
    
    print("\n" + "=" * 70)
    print("💡 Next Steps:")
    print("   1. If PDFs are missing: python extract_pdf_content.py")
    print("   2. If ChromaDB is missing: python ingest_kb.py")
    print("   3. Test RAG retrieval: python test_rag_retrieval.py")
    print("=" * 70)

if __name__ == "__main__":
    check_pdf_content_in_kb()

