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
    """Identify which financial topic the text relates to with improved classification"""
    text_lower = text.lower()
    
    # Comprehensive topic keywords with weighted scoring
    # Primary keywords (weight: 3), Secondary keywords (weight: 2), Related terms (weight: 1)
    topic_keywords = {
        "Budgeting": {
            "primary": ["budget", "budgeting", "planning money", "financial plan", "money plan"],
            "secondary": ["spend wisely", "save jar", "spend jar", "share jar", "allocate money", 
                         "money management", "expense", "income", "spending plan", "savings plan",
                         "needs vs wants", "prioritize spending", "money allocation"],
            "related": ["pocket money", "allowance", "spend", "save", "track", "plan", "divide money",
                       "separate needs", "wants", "financial discipline", "delayed gratification"]
        },
        "Value Creation": {
            "primary": ["value creation", "create value", "provide value", "add value"],
            "secondary": ["helping others", "useful", "contribute", "benefit others", "serve others",
                         "make a difference", "improve situation", "solve problem"],
            "related": ["help", "assist", "support", "useful", "beneficial", "meaningful", "purpose"]
        },
        "Entrepreneurship": {
            "primary": ["entrepreneur", "entrepreneurship", "start business", "business venture"],
            "secondary": ["profit", "revenue", "cost", "sell", "customer", "market", "product", "service",
                         "business plan", "startup", "enterprise", "venture", "selling price", "buying price",
                         "margin", "loss", "gain", "trade", "commerce"],
            "related": ["business", "trade", "sell", "buy", "customer", "client", "merchant", "vendor",
                       "income from business", "earn from business", "self-employed"]
        },
        "Earning Through Skills": {
            "primary": ["earn through skills", "skills-based earning", "earn with talent"],
            "secondary": ["earn money", "earning", "income", "wage", "salary", "payment for work",
                         "reward for skill", "monetize skill", "skill development"],
            "related": ["skills", "practice", "learn", "ability", "talent", "expertise", "competence",
                       "improve skills", "develop skills", "master", "proficiency", "work", "job",
                       "employment", "career", "profession"]
        },
        "Investing": {
            "primary": ["invest", "investment", "investing", "financial investment"],
            "secondary": ["interest", "grow money", "long-term", "savings account", "fixed deposit",
                         "mutual fund", "stocks", "shares", "returns", "dividend", "compound interest",
                         "portfolio", "asset", "wealth creation", "financial growth"],
            "related": ["save", "savings", "deposit", "bank", "financial institution", "grow wealth",
                       "future goal", "retirement", "financial security", "accumulate", "multiply money"]
        },
        "Digital Money": {
            "primary": ["digital money", "digital payment", "electronic payment", "cashless"],
            "secondary": ["upi", "online payment", "mobile wallet", "card payment", "debit card",
                         "credit card", "net banking", "internet banking", "e-wallet", "digital wallet",
                         "qr code", "scan to pay", "online transaction"],
            "related": ["digital", "electronic", "online", "mobile", "app", "technology", "cashless",
                       "paperless", "transaction", "payment method", "financial technology"]
        }
    }
    
    # Calculate weighted scores
    scores = {}
    for topic, keyword_groups in topic_keywords.items():
        score = 0
        # Primary keywords (weight: 3)
        for keyword in keyword_groups["primary"]:
            if keyword in text_lower:
                score += 3
        # Secondary keywords (weight: 2)
        for keyword in keyword_groups["secondary"]:
            if keyword in text_lower:
                score += 2
        # Related terms (weight: 1)
        for keyword in keyword_groups["related"]:
            if keyword in text_lower:
                score += 1
        
        if score > 0:
            scores[topic] = score
    
    # If we have a clear winner (score >= 3), return it
    if scores:
        max_score = max(scores.values())
        if max_score >= 3:
            # Return topic with highest score
            return max(scores, key=scores.get)
        # If scores are close, check for multiple strong matches
        elif max_score >= 2:
            # Check if there's a clear winner (at least 2 points ahead)
            sorted_scores = sorted(scores.items(), key=lambda x: -x[1])
            if len(sorted_scores) > 1 and sorted_scores[0][1] >= sorted_scores[1][1] + 2:
                return sorted_scores[0][0]
            # Otherwise return the top one
            return sorted_scores[0][0]
        else:
            # Low confidence, but return best match
            return max(scores, key=scores.get)
    
    # Fallback: Check for financial education context
    financial_terms = ["money", "financial", "finance", "economic", "rupee", "currency", "wealth", 
                       "income", "expense", "saving", "spending", "earning", "bank", "account"]
    if any(term in text_lower for term in financial_terms):
        # If it's clearly financial but can't classify, try to infer from context
        if "bank" in text_lower or "account" in text_lower:
            if "digital" in text_lower or "online" in text_lower:
                return "Digital Money"
            elif "interest" in text_lower or "deposit" in text_lower:
                return "Investing"
        elif "save" in text_lower and ("plan" in text_lower or "budget" in text_lower):
            return "Budgeting"
        elif "earn" in text_lower and ("skill" in text_lower or "work" in text_lower):
            return "Earning Through Skills"
        elif "business" in text_lower or "sell" in text_lower:
            return "Entrepreneurship"
    
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

