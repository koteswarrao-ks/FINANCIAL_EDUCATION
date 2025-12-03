# Environment Variables Setup

## Quick Start

1. **Copy the example file:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit `.env` file and add your Azure OpenAI credentials:**
   ```bash
   AZURE_OPENAI_API_KEY=your-azure-openai-api-key-here
   AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com
   AZURE_OPENAI_API_VERSION=2024-02-15-preview
   AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
   ```

3. **Install python-dotenv (if not already installed):**
   ```bash
   pip install python-dotenv
   ```

## Environment Variables

### Required

- **AZURE_OPENAI_API_KEY**: Your Azure OpenAI API key
  - Get it from: https://portal.azure.com
  - Navigate to your Azure OpenAI resource → Keys and Endpoint
  - Format: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
  
- **AZURE_OPENAI_ENDPOINT**: Your Azure OpenAI endpoint URL
  - Get it from: https://portal.azure.com
  - Navigate to your Azure OpenAI resource → Keys and Endpoint
  - Format: `https://your-resource-name.openai.azure.com`

### Optional

- **AZURE_OPENAI_API_VERSION**: Azure OpenAI API version (default: `2024-02-15-preview`)
- **AZURE_OPENAI_DEPLOYMENT_NAME**: Azure OpenAI deployment name (default: `gpt-4o-mini`)
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





