# Backend Connection Check

## Quick Check

Run this to verify backend is running:
```bash
curl http://localhost:8000/
```

Should return: `{"message":"Financial Education API","status":"running"}`

## Start Backend

If backend is not running:

1. **Terminal 1 - MCP Server:**
   ```bash
   cd backend
   ./start_mcp.sh
   ```

2. **Terminal 2 - FastAPI Backend:**
   ```bash
   cd backend
   ./start_api.sh
   ```

## Verify Both Are Running

- MCP Server: `http://localhost:5001/health`
- FastAPI Backend: `http://localhost:8000/`

## Test Profile Endpoint

```bash
curl http://localhost:8000/api/profile/analyze -X POST -H "Content-Type: application/json" -d '{"child_id":"kid_001"}'
```

Should return profile data with `success: true`.



