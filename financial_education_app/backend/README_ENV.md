# Environment Variables Setup

## Quick Start

1. **Copy the example file:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit `.env` file and add your OpenAI API key:**
   ```bash
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Install python-dotenv (if not already installed):**
   ```bash
   pip install python-dotenv
   ```

## Environment Variables

### Required

- **OPENAI_API_KEY**: Your OpenAI API key for semantic analysis
  - Get it from: https://platform.openai.com/api-keys
  - Format: `sk-...`

### Optional

- **MCP_SERVER_URL**: MCP server URL (default: `http://localhost:5001`)
- **MCP_SERVER_PORT**: MCP server port (default: `5001`)
- **BACKEND_PORT**: Backend API port (default: `8000`)
- **BACKEND_HOST**: Backend API host (default: `0.0.0.0`)
- **ENVIRONMENT**: Environment mode (default: `development`)

## Usage

The `.env` file is automatically loaded when you run the application. The `python-dotenv` package reads the `.env` file and sets the environment variables.

## Security Note

⚠️ **Never commit `.env` file to version control!**

The `.gitignore` file is configured to exclude `.env` files. Always use `.env.example` as a template for documentation.





