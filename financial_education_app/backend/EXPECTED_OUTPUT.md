# Expected Demo Output

Based on the transactions in `user_data.json` for `kid_001` (Aarav, age 12), here's what the demo should produce:

## Input Data
- **Child ID**: kid_001
- **Name**: Aarav
- **Age**: 12
- **Grade**: 6
- **Country**: India
- **Transactions**: 12 transactions including cricket gear, puzzles, art supplies, books, and educational apps

## Expected Output (Fallback Analysis)

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

## Analysis Breakdown

### Hobbies Detected:
- **Cricket**: From transactions t1, t2, t3 (Cricket Bat Grip, Practice Balls, Cricket App)
- **Puzzles**: From transactions t4, t5 (Rubik's Cube, Logic Puzzle Game)
- **Art**: From transactions t6, t7 (Sketchbook, Charcoal Pencils)

### Favorite Subjects:
- **Science**: From transactions t8, t12 (Science books)
- **Math**: From transactions t9, t10 (Math books and apps)

### Learning Style:
- **Digital**: Detected from multiple app purchases (t3, t10, t11, t12)
- Also has book purchases, so could be "mixed" in some cases

### Pocket Money:
- **Amount**: 200 INR (from transaction t_p1)
- **Frequency**: Weekly (inferred from description)

## Running the Demo

1. **Start MCP Server** (Terminal 1):
   ```bash
   cd financial_education_app/backend/mcp_server
   python3 -m uvicorn mcp_server:app --port 5001
   ```

2. **Run Demo** (Terminal 2):
   ```bash
   cd financial_education_app/backend
   python3 run_demo.py
   ```

3. **Expected Console Output**:
   ```
   Starting Financial Education Demo...
   ==================================================
   
   Fetching profile for: kid_001
   --------------------------------------------------
   
   Personalized Profile Output:
   ==================================================
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

## Notes

- If OpenAI API key is set, the output may vary slightly with more nuanced analysis
- The fallback analysis uses rule-based pattern matching
- All detected values are based on transaction categories and descriptions


