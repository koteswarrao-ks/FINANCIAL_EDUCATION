# How to Run the Demo

## Step 1: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

## Step 2: Start MCP Server (Terminal 1)

```bash
cd backend/mcp_server
python3 -m uvicorn mcp_server:app --port 5001
```

Or use the script:
```bash
cd backend
chmod +x start_mcp.sh
./start_mcp.sh
```

## Step 3: Run Demo (Terminal 2)

```bash
cd backend
python3 run_demo.py
```

## Expected Output

The demo will:
1. Connect to MCP server on port 5001
2. Fetch user profile for "kid_001"
3. Analyze transactions to infer:
   - Hobbies
   - Favorite Subjects
   - Preferred Learning Style
   - Pocket Money pattern
4. Return personalized profile

## Troubleshooting

- **MCP server not found**: Make sure MCP server is running on port 5001
- **Import errors**: Install requirements: `pip install -r requirements.txt`
- **OpenAI errors**: The code will use fallback analysis if OpenAI API key is not set


