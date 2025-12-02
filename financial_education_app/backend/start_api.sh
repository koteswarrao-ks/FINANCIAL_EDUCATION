#!/bin/bash
# Start FastAPI backend server
cd "$(dirname "$0")"
python3 -m uvicorn api.main:app --port 8000 --host 0.0.0.0 --reload



