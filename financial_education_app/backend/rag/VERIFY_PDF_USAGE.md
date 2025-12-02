# 📚 Verifying PDF Content Usage in Story Generation

This guide shows you how to verify that PDF content from `source_pdfs/` is being used when generating stories.

## The Complete Flow

```
PDFs (source_pdfs/) 
    ↓
extract_pdf_content.py
    ↓
financial_concepts.json (with "source": "Class_Xth.pdf")
    ↓
ingest_kb.py
    ↓
ChromaDB (vector store with metadata)
    ↓
story_agent.py (RAG retrieval)
    ↓
Story Generation (uses PDF content)
```

## Step 1: Verify PDFs Are Extracted

Check if PDF content is in `financial_concepts.json`:

```bash
cd backend/rag
python verify_pdf_usage.py
```

This will show:
- How many entries come from each PDF
- Sample content from PDFs
- Whether ChromaDB is updated

## Step 2: Test RAG Retrieval

Test if RAG can retrieve PDF content:

```bash
cd backend/rag
python test_rag_retrieval.py
```

This will:
- Query ChromaDB for financial concepts
- Show which chunks come from PDFs vs original KB
- Display the actual content retrieved

## Step 3: Check Story Generation Logs

When you generate a story, check the backend logs. You should see:

```
🔍 RAG Retrieval for concept: 'Budgeting'
📚 Retrieved 2 chunks:
   - From PDFs: 1 source(s)
      ✓ Class_7th.pdf
   - From original KB: 1 chunk(s)
   - Total context length: 1234 characters
```

## Step 4: Verify in Story Response

The story agent now includes source information in the RAG context. You can check:

1. **Backend logs** - Shows which PDFs were used
2. **Story JSON response** - Contains `ragContextUsed` field with source info
3. **API response** - The `llm_call_details` includes RAG context preview

## Quick Verification Commands

```bash
# 1. Count PDF entries in JSON
cd backend/rag
cat financial_concepts.json | python3 -c "import sys, json; data=json.load(sys.stdin); pdf_entries=[e for e in data if e.get('source', '').endswith('.pdf')]; print(f'PDF entries: {len(pdf_entries)}/{len(data)}')"

# 2. List unique PDF sources
cat financial_concepts.json | python3 -c "import sys, json; data=json.load(sys.stdin); sources=set(e.get('source', '') for e in data if e.get('source', '').endswith('.pdf')); print('PDF sources:', sorted(sources))"

# 3. Check specific concept from PDFs
cat financial_concepts.json | python3 -c "import sys, json; data=json.load(sys.stdin); budget_pdf=[e for e in data if 'Budget' in e.get('topic', '') and e.get('source', '').endswith('.pdf')]; print(f'Budgeting entries from PDFs: {len(budget_pdf)}')"
```

## What to Look For

✅ **Good signs:**
- `verify_pdf_usage.py` shows entries from all 5 PDFs
- `test_rag_retrieval.py` retrieves chunks with `source: "Class_Xth.pdf"`
- Story generation logs show "From PDFs: X source(s)"
- Story content matches concepts from PDFs

❌ **Problems:**
- No PDF entries in `financial_concepts.json` → Run `extract_pdf_content.py`
- ChromaDB not found → Run `ingest_kb.py`
- RAG only returns "original knowledge base" → Check ChromaDB was updated after PDF extraction

## Example: Tracing a Story

1. **Generate a story** for concept "Budgeting"
2. **Check backend logs** - Should show:
   ```
   🔍 RAG Retrieval for concept: 'Budgeting'
   📚 Retrieved 2 chunks:
      - From PDFs: 1 source(s)
         ✓ Class_7th.pdf
   ```
3. **Check story response** - The `ragContextUsed` field contains:
   ```
   [Source: Class_7th.pdf]
   Budgeting means creating a simple plan...
   ```
4. **Verify in PDF** - Search `Class_7th.pdf` for the concept

## Troubleshooting

### PDFs not in knowledge base?
```bash
cd backend/rag
python extract_pdf_content.py  # Extract PDFs
python ingest_kb.py              # Update ChromaDB
```

### ChromaDB not updated?
```bash
cd backend/rag
python ingest_kb.py  # Re-ingest all content
```

### RAG not finding PDF content?
- Check ChromaDB collection name matches: `financial_concepts`
- Verify embeddings model matches: `sentence-transformers/all-MiniLM-L6-v2`
- Check if concept name matches topics in PDFs

