# 🚀 Quick Start Guide

## Prerequisites Installed ✅
- ✅ Angular CLI (ng command)
- ✅ Node.js and npm
- ✅ All frontend dependencies

## Starting the Application

### Terminal 1: MCP Server
```bash
cd backend
./start_mcp.sh
```
**Runs on:** `http://localhost:5001`

### Terminal 2: FastAPI Backend
```bash
cd backend
./start_api.sh
```
**Runs on:** `http://localhost:8000`

### Terminal 3: Angular Frontend
```bash
cd frontend
ng serve
```
**Runs on:** `http://localhost:4200`

## Access the App

Open your browser and go to:
```
http://localhost:4200
```

You should see:
- 🐼 **Buddy the Panda** on the home screen
- Rewards preview (points, level, badges)
- Action buttons: Start Story, Start Quiz, My Rewards

## Complete Flow

1. **Home** → Click "Start Story"
2. **Profile Analysis** → See reasoning and personalization
3. **Story** → Read personalized story with panels
4. **Quiz** → Answer questions
5. **Results** → See score, points earned, badges
6. **Rewards** → View all achievements

## Troubleshooting

### If `ng serve` fails:
```bash
cd frontend
npm install
ng serve
```

### If API connection fails:
- Make sure MCP server is running on port 5001
- Make sure FastAPI backend is running on port 8000
- Check browser console for CORS errors

### If you see build errors:
```bash
cd frontend
rm -rf node_modules
npm install
ng serve
```

## Environment Setup

Make sure `backend/.env` exists with:
```
OPENAI_API_KEY=sk-your-key-here
MCP_SERVER_URL=http://localhost:5001
```

## That's it! 🎉

Your Financial Education App is ready to use!



