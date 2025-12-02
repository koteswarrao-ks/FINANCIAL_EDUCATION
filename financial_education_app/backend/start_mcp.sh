#!/bin/bash
# Start MCP server
cd "$(dirname "$0")/mcp_server"
python3 -m uvicorn mcp_server:app --port 5001 --host 0.0.0.0





