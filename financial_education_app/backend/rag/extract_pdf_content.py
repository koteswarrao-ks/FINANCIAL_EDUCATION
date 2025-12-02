"""
PDF Content Extractor for Financial Education Knowledge Base
Extracts text from PDF files and structures it for the knowledge base
"""

import os
import json
import re
from pathlib import Path
from typing import List, Dict

try:
    import PyPDF2
    PDF_LIBRARY = "PyPDF2"
except ImportError:
    try:
        import pdfplumber
        PDF_LIBRARY = "pdfplumber"
    except ImportError:
        PDF_LIBRARY = None

BASE_DIR = Path(__file__).resolve().parent
PDF_DIR = BASE_DIR / "source_pdfs"
OUTPUT_JSON = BASE_DIR / "financial_concepts.json"

# Financial education topics to look for
TOPICS = [
    "Budgeting", "Budget", "Saving", "Spending",
    "Value Creation", "Value", "Earning",
    "Entrepreneurship", "Business", "Profit",
    "Investing", "Investment", "Interest",
    "Digital Money", "Digital Payment", "UPI", "Online Payment",
    "Banking", "Bank", "Account"
]

def extract_text_pypdf2(pdf_path: Path) -> str:
    """Extract text using PyPDF2"""
    text = ""
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
    return text

def extract_text_pdfplumber(pdf_path: Path) -> str:
    """Extract text using pdfplumber (better for complex PDFs)"""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def extract_text_from_pdf(pdf_path: Path) -> str:
    """Extract text from PDF using available library"""
    if PDF_LIBRARY == "pdfplumber":
        return extract_text_pdfplumber(pdf_path)
    elif PDF_LIBRARY == "PyPDF2":
        return extract_text_pypdf2(pdf_path)
    else:
        raise ImportError("No PDF library found. Install PyPDF2 or pdfplumber: pip install PyPDF2 pdfplumber")

def clean_text(text: str) -> str:
    """Clean extracted text"""
    # Remove excessive whitespace
    text = re.sub(r'\s+', ' ', text)
    # Remove special characters but keep basic punctuation
    text = re.sub(r'[^\w\s.,;:!?()\-]', '', text)
    return text.strip()

def identify_topic(text: str) -> str:
    """Identify which financial topic the text relates to"""
    text_lower = text.lower()
    
    # Topic matching with priority
    topic_keywords = {
        "Budgeting": ["budget", "budgeting", "planning money", "spend wisely", "save jar", "spend jar"],
        "Value Creation": ["value creation", "create value", "helping others", "useful", "contribute"],
        "Entrepreneurship": ["entrepreneur", "business", "profit", "revenue", "cost", "sell", "customer"],
        "Earning Through Skills": ["earn", "skills", "practice", "learn", "ability", "talent"],
        "Investing": ["invest", "investment", "interest", "grow money", "long-term", "savings account"],
        "Digital Money": ["digital money", "upi", "online payment", "digital payment", "mobile wallet", "card payment"]
    }
    
    scores = {}
    for topic, keywords in topic_keywords.items():
        score = sum(1 for keyword in keywords if keyword in text_lower)
        if score > 0:
            scores[topic] = score
    
    if scores:
        return max(scores, key=scores.get)
    return "General"

def chunk_text(text: str, max_chunk_size: int = 500) -> List[str]:
    """Split text into meaningful chunks"""
    # Split by sentences first
    sentences = re.split(r'[.!?]+\s+', text)
    chunks = []
    current_chunk = ""
    
    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue
            
        # If adding this sentence would exceed limit, save current chunk
        if len(current_chunk) + len(sentence) > max_chunk_size and current_chunk:
            chunks.append(current_chunk.strip())
            current_chunk = sentence
        else:
            current_chunk += " " + sentence if current_chunk else sentence
    
    # Add remaining chunk
    if current_chunk:
        chunks.append(current_chunk.strip())
    
    return chunks

def extract_financial_content(pdf_path: Path) -> List[Dict]:
    """Extract and structure financial education content from PDF"""
    print(f"📄 Extracting content from: {pdf_path.name}")
    
    try:
        # Extract text
        raw_text = extract_text_from_pdf(pdf_path)
        cleaned_text = clean_text(raw_text)
        
        # Split into chunks
        chunks = chunk_text(cleaned_text, max_chunk_size=400)
        
        # Structure content
        extracted_content = []
        for i, chunk in enumerate(chunks):
            if len(chunk) < 50:  # Skip very short chunks
                continue
                
            topic = identify_topic(chunk)
            
            # Create structured entry
            entry = {
                "id": f"{pdf_path.stem.lower()}_{i+1:03d}",
                "topic": topic,
                "content": chunk,
                "source": pdf_path.name
            }
            extracted_content.append(entry)
        
        print(f"✅ Extracted {len(extracted_content)} content chunks from {pdf_path.name}")
        return extracted_content
        
    except Exception as e:
        print(f"❌ Error processing {pdf_path.name}: {str(e)}")
        return []

def merge_with_existing_kb(new_content: List[Dict], existing_file: Path) -> List[Dict]:
    """Merge new content with existing knowledge base"""
    existing_content = []
    
    if existing_file.exists():
        with open(existing_file, 'r', encoding='utf-8') as f:
            existing_content = json.load(f)
    
    # Combine and remove duplicates (based on content similarity)
    all_content = existing_content + new_content
    
    # Simple deduplication - remove exact duplicates
    seen = set()
    unique_content = []
    for item in all_content:
        content_hash = hash(item['content'][:100])  # Hash first 100 chars
        if content_hash not in seen:
            seen.add(content_hash)
            unique_content.append(item)
    
    return unique_content

def main():
    """Main extraction process"""
    print("=" * 60)
    print("📚 PDF Content Extractor for Financial Education KB")
    print("=" * 60)
    
    # Check if PDF library is available
    if PDF_LIBRARY is None:
        print("\n❌ ERROR: No PDF library found!")
        print("Please install one of the following:")
        print("  pip install PyPDF2")
        print("  pip install pdfplumber  (recommended for better extraction)")
        return
    
    print(f"\n📦 Using PDF library: {PDF_LIBRARY}")
    
    # Check PDF directory
    if not PDF_DIR.exists():
        print(f"\n❌ PDF directory not found: {PDF_DIR}")
        return
    
    pdf_files = list(PDF_DIR.glob("*.pdf"))
    if not pdf_files:
        print(f"\n❌ No PDF files found in: {PDF_DIR}")
        return
    
    print(f"\n📄 Found {len(pdf_files)} PDF file(s)")
    
    # Extract content from all PDFs
    all_extracted = []
    for pdf_file in pdf_files:
        content = extract_financial_content(pdf_file)
        all_extracted.extend(content)
    
    if not all_extracted:
        print("\n❌ No content extracted from PDFs")
        return
    
    # Merge with existing knowledge base
    print(f"\n📝 Merging with existing knowledge base...")
    merged_content = merge_with_existing_kb(all_extracted, OUTPUT_JSON)
    
    # Save to JSON
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(merged_content, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Successfully updated knowledge base!")
    print(f"   - Total entries: {len(merged_content)}")
    print(f"   - New entries: {len(all_extracted)}")
    print(f"   - Saved to: {OUTPUT_JSON}")
    print(f"\n💡 Next step: Run 'python ingest_kb.py' to update ChromaDB")

if __name__ == "__main__":
    main()

