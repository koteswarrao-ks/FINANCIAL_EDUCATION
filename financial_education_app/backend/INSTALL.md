# Installation Instructions

## Quick Start

Install all required packages using `requirements.txt`:

```bash
cd financial_education_app/backend
pip install -r requirements.txt
```

## Verify Installation

Check if all packages are installed correctly:

```bash
python -c "from langchain_openai import OpenAIEmbeddings, ChatOpenAI; print('✓ All packages installed successfully!')"
```

## Troubleshooting

If you encounter import errors:

1. **Make sure you're in the correct environment:**
   ```bash
   which python
   pip list | grep langchain
   ```

2. **Reinstall from requirements.txt:**
   ```bash
   pip install -r requirements.txt --upgrade
   ```

3. **Check Python version (requires 3.8+):**
   ```bash
   python --version
   ```

4. **If using virtual environment, activate it first:**
   ```bash
   source venv/bin/activate  # Linux/Mac
   # or
   venv\Scripts\activate  # Windows
   ```

## Required Packages

All dependencies are listed in `requirements.txt`. Key packages include:

- **fastapi**: Web framework
- **uvicorn**: ASGI server
- **langchain**: Core LangChain library
- **langchain-openai**: OpenAI integrations
- **langchain-community**: Community integrations
- **chromadb**: Vector database for embeddings
- **openai**: OpenAI API client


