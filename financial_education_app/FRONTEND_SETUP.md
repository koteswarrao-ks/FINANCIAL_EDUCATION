# Frontend Setup and Usage Guide

## Overview

The frontend is an Angular application that provides a complete learning journey:
1. **Profile Analysis** - Analyzes child's profile and displays reasoning
2. **Story Generation** - Generates personalized stories based on profile
3. **Quiz Generation** - Creates quizzes based on the stories

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Angular CLI: `npm install -g @angular/cli`

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Backend Services

**Terminal 1: Start MCP Server**
```bash
cd backend
./start_mcp.sh
```

**Terminal 2: Start FastAPI Backend**
```bash
cd backend
./start_api.sh
```

The API will be available at `http://localhost:8000`

### 3. Start Frontend Development Server

```bash
cd frontend
ng serve
```

The frontend will be available at `http://localhost:4200`

## Application Flow

### Step 1: Profile Analysis
- On page load, the app automatically analyzes the profile for the default child ID (`kid_001`)
- Displays:
  - Child's basic information (name, age, grade, country)
  - **Analysis Reasoning** - Explains how hobbies, subjects, learning style, and pocket money patterns were identified
  - Personalization details with tags

### Step 2: Read Stories
- Click the **"📖 Read Stories"** button
- The app generates a personalized story based on:
  - Child's profile
  - Current learning topic (from learning progress)
  - Child's hobbies and interests
- Displays:
  - Story title and metadata
  - Story panels (visual breakdown)
  - Full story text
  - Key learning points

### Step 3: Start Quiz
- After reading the story, click **"✅ Start Quiz"** button
- The app generates a quiz based on the story content
- Displays:
  - Quiz questions with multiple choice options
  - Correct answers highlighted

## Component Structure

```
frontend/src/app/
├── app.component.ts          # Root component
├── app.module.ts            # Angular module configuration
├── components/
│   └── learning-journey.component.ts    # Main learning journey component
│   └── learning-journey.component.html  # Template
│   └── learning-journey.component.css   # Styles
└── services/
    └── user-profile.service.ts          # API service
```

## API Endpoints

The frontend communicates with the backend API at `http://localhost:8000/api`:

- `POST /api/profile/analyze` - Analyze child profile
- `POST /api/story/generate` - Generate personalized story
- `POST /api/quiz/generate` - Generate quiz from story

## Features

### Profile Analysis
- ✅ Automatic profile analysis on load
- ✅ Detailed reasoning display
- ✅ Visual tags for hobbies and subjects
- ✅ Pocket money pattern visualization

### Story Display
- ✅ Panel-based story visualization
- ✅ Full story text
- ✅ Learning points summary
- ✅ Next recommended concept

### Quiz Interface
- ✅ Multiple choice questions
- ✅ Visual answer options
- ✅ Correct answer highlighting

## Customization

### Change Default Child ID

Edit `learning-journey.component.ts`:
```typescript
childId: string = 'kid_001'; // Change to your child ID
```

### Change API URL

Edit `user-profile.service.ts`:
```typescript
private apiUrl = 'http://localhost:8000/api'; // Change to your backend URL
```

## Troubleshooting

### CORS Errors
- Ensure the backend API has CORS enabled (already configured in `api/main.py`)
- Check that the API URL in the service matches your backend

### API Connection Issues
- Verify MCP server is running on port 5001
- Verify FastAPI backend is running on port 8000
- Check browser console for detailed error messages

### Angular Build Issues
- Run `npm install` to ensure all dependencies are installed
- Clear node_modules and reinstall if needed: `rm -rf node_modules && npm install`

## Development

### Build for Production
```bash
ng build --prod
```

### Run Tests
```bash
ng test
```

### Code Formatting
```bash
ng lint
```



