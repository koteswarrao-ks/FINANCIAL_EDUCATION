# PDF Content Extraction Guide

## Overview
This guide explains how to extract financial education content from PDF files and add it to the knowledge base.

## Step 1: Install PDF Libraries

```bash
cd backend
pip install PyPDF2 pdfplumber
```

Or install from requirements:
```bash
pip install -r requirements.txt
```

## Step 2: Place PDF Files

Place your PDF files in the `source_pdfs/` directory:
```
backend/rag/source_pdfs/
  ├── Class_6th.pdf
  ├── Class_7th.pdf
  ├── Class_8th.pdf
  ├── Class_9th.pdf
  └── Class_10th.pdf
```

## Step 3: Extract Content from PDFs

Run the extraction script:
```bash
cd backend/rag
python extract_pdf_content.py
```

**What it does:**
- Extracts text from all PDFs in `source_pdfs/`
- Identifies financial topics (Budgeting, Investing, etc.)
- Chunks content into manageable pieces (~400 chars)
- Merges with existing `financial_concepts.json`
- Removes duplicates

**Output:**
- Updates `financial_concepts.json` with new content
- Each entry includes:
  - `id`: Unique identifier
  - `topic`: Financial topic (Budgeting, Investing, etc.)
  - `content`: Extracted text chunk
  - `source`: PDF filename

## Step 4: Ingest into Vector Database

After extraction, update ChromaDB:
```bash
python ingest_kb.py
```

This will:
- Read updated `financial_concepts.json`
- Create embeddings for all content
- Store in ChromaDB for semantic search

## Step 5: Verify

Check the knowledge base:
```bash
# View updated JSON
cat financial_concepts.json | jq 'length'  # Count entries
cat financial_concepts.json | jq '.[] | select(.topic=="Budgeting")'  # Filter by topic
```

## How It Works

### Content Extraction
1. **Text Extraction**: Uses PyPDF2 or pdfplumber to extract text
2. **Cleaning**: Removes excessive whitespace and special characters
3. **Chunking**: Splits into ~400 character chunks (maintains context)
4. **Topic Identification**: Automatically identifies financial topics

### Topic Mapping
The tool maps content to these topics:
- **Budgeting**: budget, planning money, save jar, spend jar
- **Value Creation**: value creation, helping others, contribute
- **Entrepreneurship**: business, profit, revenue, customer
- **Earning Through Skills**: earn, skills, practice, learn
- **Investing**: invest, interest, grow money, savings account
- **Digital Money**: UPI, online payment, digital payment, mobile wallet

### Deduplication
- Removes exact duplicate content
- Preserves existing knowledge base entries
- Merges new content intelligently

## Troubleshooting

### "No PDF library found"
```bash
pip install pdfplumber  # Recommended
# or
pip install PyPDF2
```

### "No content extracted"
- Check if PDFs are text-based (not scanned images)
- Try a different PDF library
- Check PDF file permissions

### "Collection name mismatch"
- Fixed in `ingest_kb.py` - now uses `"financial_concepts"`
- Matches `profile_agent.py` collection name

## Example Workflow

```bash
# 1. Install dependencies
pip install pdfplumber

# 2. Extract from PDFs
cd backend/rag
python extract_pdf_content.py

# 3. Ingest to vector DB
python ingest_kb.py

# 4. Restart backend to use new knowledge base
cd ..
./start_api.sh
```

## Tips

1. **Quality over Quantity**: The tool extracts all content, but you may want to review and curate
2. **Topic Accuracy**: Review topic assignments - some content might need manual categorization
3. **Chunk Size**: Adjust `max_chunk_size` in `extract_pdf_content.py` if needed (default: 400 chars)
4. **Source Tracking**: Each entry includes `source` field to track which PDF it came from

## Next Steps

After extraction:
1. Review `financial_concepts.json` for quality
2. Run `ingest_kb.py` to update vector database
3. Test RAG retrieval in profile agent
4. Monitor story/quiz generation quality

