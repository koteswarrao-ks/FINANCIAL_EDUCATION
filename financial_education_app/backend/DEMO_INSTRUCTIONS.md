# Demo Instructions and Expected Output

## Quick Start

### Terminal 1: Start MCP Server
```bash
cd financial_education_app/backend/mcp_server
python3 -m uvicorn mcp_server:app --port 5001
```

You should see:
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:5001
```

### Terminal 2: Run Demo

**Option 1: Main demo (recommended)**
```bash
cd financial_education_app/backend
python3 run_demo.py
```

**Option 2: Test script (checks MCP server first)**
```bash
cd financial_education_app/backend
python3 test_and_run.py
```

## Expected Output

### Using Fallback Analysis (No OpenAI API Key)

```json
{
  "childId": "kid_001",
  "name": "Aarav",
  "age": 12,
  "grade": "6",
  "country": "India",
  "personalization": {
    "hobbies": ["cricket", "puzzles", "art"],
    "favoriteSubjects": ["science", "math"],
    "preferredLearningStyle": "digital",
    "pocketMoney": {
      "frequency": "weekly",
      "amount": 200,
      "currency": "INR"
    }
  }
}
```

### Using OpenAI API (if API key is set)

The output will be similar but with more detailed analysis from GPT-4o-mini, potentially including:
- More nuanced hobby detection
- Better learning style inference
- More accurate subject preferences

## What the Demo Does

1. **Connects to MCP Server** (port 5001)
   - Fetches user profile for "kid_001"
   - Gets basic profile (name, age, grade, country)
   - Gets transaction history

2. **Analyzes Transactions**
   - Extracts hobbies from purchase categories
   - Identifies favorite subjects from educational purchases
   - Determines preferred learning style
   - Extracts pocket money pattern

3. **Returns Personalized Profile**
   - Combines basic profile with inferred personalization
   - Ready for use by other agents (Quiz, Story, Gamification)

## Troubleshooting

### Error: "MCP server connection failed"
- Make sure MCP server is running on port 5001
- Check: `curl http://localhost:5001/health`

### Error: "User not found"
- Verify `user_data.json` contains "kid_001"
- Check MCP server logs

### Import Errors
- Install dependencies: `pip install -r requirements.txt`
- Make sure you're in the `backend` directory

### OpenAI Errors
- The code will automatically use fallback analysis if OpenAI is not available
- To use OpenAI: `export OPENAI_API_KEY=your_key`

## Next Steps

After running the demo successfully, you can:
1. Extend `orchestration_agent.py` to call Quiz Agent
2. Implement `story_agent.py` to generate personalized stories
3. Implement `quiz_agent.py` to create quizzes
4. Implement `gamification_agent.py` for points and badges


