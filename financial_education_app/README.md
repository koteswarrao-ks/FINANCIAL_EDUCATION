# 🎓 Financial Education Platform

A cutting-edge, AI-powered learning platform that delivers personalized financial education to children through interactive stories, adaptive quizzes, and gamified learning experiences. Built with Angular, FastAPI, and Azure OpenAI, featuring a sophisticated multi-agent architecture with Retrieval-Augmented Generation (RAG).

## ✨ Features

- **🤖 AI-Powered Personalization**: Analyzes transaction history to infer hobbies, favorite subjects, and learning styles
- **📚 Interactive Stories**: Generates personalized financial education stories with 4-6 panels
- **🎯 Adaptive Quizzes**: Creates quizzes that adapt to each child's learning history and weak areas
- **🏆 Gamification System**: Points, levels, and badges to keep children engaged
- **📊 Learning Progress Tracking**: Tracks completed topics and manages learning paths
- **👥 Leaderboard**: Competitive rankings to motivate learning
- **🎨 Dynamic Avatars**: Personalized cartoon avatars for each child
- **🔍 RAG-Powered Knowledge Base**: Grounded in authoritative financial education content from Class 6-10 curriculum

## 🏗️ Architecture

The platform follows a modern, layered architecture:

- **Frontend Layer**: Angular application with component-based UI
- **Backend API Layer**: FastAPI REST API for business logic
- **Agent Layer**: Multi-agent system for orchestration and intelligence
- **RAG System**: Vector database with semantic search for knowledge retrieval
- **Data Persistence Layer**: MCP Server managing JSON-based data storage

For detailed architecture documentation, see [ARCHITECTURE.md](../ARCHITECTURE.md) and [ARCHITECTURE_PITCH.md](../ARCHITECTURE_PITCH.md).

## 🛠️ Technology Stack

### Frontend
- **Framework**: Angular 15
- **Language**: TypeScript
- **Styling**: CSS3 with Flexbox/Grid
- **Avatar Service**: DiceBear Avatars API

### Backend
- **Framework**: FastAPI
- **Language**: Python 3
- **LLM**: Azure OpenAI (GPT-4o-mini)
- **Vector DB**: ChromaDB
- **Embeddings**: HuggingFace (sentence-transformers/all-MiniLM-L6-v2)
- **Data Storage**: JSON files via MCP Server

### Infrastructure
- **API Server**: Uvicorn (ASGI)
- **MCP Server**: FastAPI (Port 5001)
- **Backend API**: FastAPI (Port 8000)
- **Frontend**: Angular Dev Server (Port 4200)

## 📋 Prerequisites

- **Python 3.8+** with pip
- **Node.js 16+** and npm
- **Angular CLI 15+** (`npm install -g @angular/cli`)
- **Azure OpenAI Account** with API key and endpoint
- **Git** (for cloning the repository)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd FINANCIAL_EDUCATION/financial_education_app
```

### 2. Backend Setup

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env  # If .env.example exists, or create manually
```

Edit `backend/.env` and add your Azure OpenAI credentials:

```env
AZURE_OPENAI_API_KEY=your-azure-openai-api-key-here
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
MCP_SERVER_URL=http://localhost:5001
```

### 3. Frontend Setup

```bash
cd frontend

# Install Node dependencies
npm install
```

### 4. Start the Application

You need to run three servers in separate terminals:

#### Terminal 1: MCP Server
```bash
cd backend
./start_mcp.sh
# Or manually:
python -m uvicorn mcp_server.mcp_server:app --port 5001 --host 0.0.0.0 --reload
```

#### Terminal 2: Backend API
```bash
cd backend
./start_api.sh
# Or manually:
python -m uvicorn api.main:app --port 8000 --host 0.0.0.0 --reload
```

#### Terminal 3: Frontend
```bash
cd frontend
npm start
# Or:
ng serve
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:4200
```

## 📁 Project Structure

```
financial_education_app/
├── backend/
│   ├── agents/              # Multi-agent system
│   │   ├── profile_agent.py          # Profile analysis agent
│   │   ├── story_agent.py            # Story generation agent
│   │   ├── quiz_agent.py             # Quiz generation agent
│   │   ├── gamification_agent.py    # Points, levels, badges
│   │   ├── learning_progress.py      # Progress tracking
│   │   └── orchestration_agent.py    # Agent coordination
│   ├── api/
│   │   └── main.py                   # FastAPI REST endpoints
│   ├── mcp_server/
│   │   ├── mcp_server.py            # Data persistence server
│   │   ├── user_data.json            # User profiles
│   │   └── user_data/                # JSON data files
│   ├── rag/
│   │   ├── ingest_kb.py              # Knowledge base ingestion
│   │   ├── extract_pdf_content.py   # PDF content extraction
│   │   ├── financial_concepts.json   # Knowledge base
│   │   ├── source_pdfs/              # PDF source files
│   │   └── chroma_store/             # Vector database
│   ├── requirements.txt              # Python dependencies
│   ├── start_api.sh                  # API startup script
│   └── start_mcp.sh                  # MCP server startup script
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/           # Angular components
│   │   │   │   ├── home.component.*
│   │   │   │   ├── login.component.*
│   │   │   │   ├── profile-analysis.component.*
│   │   │   │   ├── story-generation.component.*
│   │   │   │   ├── quiz.component.*
│   │   │   │   ├── rewards.component.*
│   │   │   │   └── leaderboard.component.*
│   │   │   ├── services/
│   │   │   │   └── user-profile.service.ts
│   │   │   └── app.component.*
│   │   └── index.html
│   ├── package.json                  # Node dependencies
│   └── angular.json                  # Angular configuration
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/login` - User authentication

### Learning Journey
- `GET /api/start/:child_id` - Orchestrates complete learning journey (profile → story → quiz)
- `POST /api/profile/analyze` - Analyzes child profile and infers personalization
- `POST /api/story/generate` - Generates personalized financial story
- `POST /api/quiz/generate` - Creates adaptive quiz
- `POST /api/submit_quiz/:child_id` - Submits quiz answers and updates progress

### Gamification
- `GET /api/rewards/:child_id` - Retrieves points, levels, and badges
- `GET /api/leaderboard` - Returns ranked user standings

### Profile Management
- `GET /api/profile/preferences` - Retrieves saved preferences
- `POST /api/profile/preferences` - Saves profile preferences

### API Documentation
Once the backend is running, visit:
```
http://localhost:8000/docs
```
for interactive API documentation (Swagger UI).

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

**Required:**
- `AZURE_OPENAI_API_KEY` - Your Azure OpenAI API key
- `AZURE_OPENAI_ENDPOINT` - Your Azure OpenAI endpoint URL

**Optional:**
- `AZURE_OPENAI_API_VERSION` - API version (default: `2024-02-15-preview`)
- `AZURE_OPENAI_DEPLOYMENT_NAME` - Deployment name (default: `gpt-4o-mini`)
- `MCP_SERVER_URL` - MCP server URL (default: `http://localhost:5001`)
- `MCP_SERVER_PORT` - MCP server port (default: `5001`)
- `BACKEND_PORT` - Backend API port (default: `8000`)
- `BACKEND_HOST` - Backend API host (default: `0.0.0.0`)

For detailed environment setup, see [backend/README_ENV.md](backend/README_ENV.md).

## 🎮 User Flow

1. **Login** → User authenticates with username/password
2. **Home** → View profile, rewards preview, and action buttons
3. **Start Story** → Triggers orchestration:
   - Profile analysis (if needed)
   - Story generation with personalization
   - Quiz creation
4. **Story View** → Read personalized financial education story
5. **Quiz** → Answer adaptive questions
6. **Results** → View score, points earned, badges unlocked
7. **Rewards** → See complete gamification status
8. **Leaderboard** → View rankings and compete with others

## 🧪 Development

### Running Tests

```bash
# Backend tests (if available)
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

### Building for Production

```bash
# Frontend production build
cd frontend
npm run build

# Output will be in frontend/dist/
```

### Code Structure

- **Agents**: Each agent in `backend/agents/` follows single-responsibility principle
- **Components**: Angular components in `frontend/src/app/components/` are self-contained
- **Services**: Centralized API communication via `user-profile.service.ts`
- **RAG**: Knowledge base ingestion and retrieval in `backend/rag/`

## 🐛 Troubleshooting

### Frontend Issues

**Angular compilation errors:**
```bash
cd frontend
rm -rf node_modules
npm install
ng serve
```

**Port 4200 already in use:**
```bash
ng serve --port 4201
```

### Backend Issues

**Module not found errors:**
```bash
cd backend
pip install -r requirements.txt
```

**MCP server connection errors:**
- Ensure MCP server is running on port 5001
- Check `MCP_SERVER_URL` in `.env` file

**Azure OpenAI errors:**
- Verify API key and endpoint in `.env`
- Check API version compatibility
- Ensure deployment name matches your Azure resource

### General Issues

**CORS errors:**
- Ensure backend CORS middleware allows frontend origin
- Check that all three servers are running

**Timeout errors:**
- LLM calls have a 150-second timeout
- Check Azure OpenAI service status
- Verify network connectivity

## 📚 Additional Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - Detailed architecture diagrams
- [ARCHITECTURE_PITCH.md](../ARCHITECTURE_PITCH.md) - Architecture pitch document
- [QUICK_START.md](QUICK_START.md) - Quick start guide
- [backend/README_ENV.md](backend/README_ENV.md) - Environment variables guide
- [backend/rag/README_PDF_EXTRACTION.md](backend/rag/README_PDF_EXTRACTION.md) - PDF extraction guide

## 🔒 Security Notes

- ⚠️ **Never commit `.env` files** to version control
- Store API keys securely in environment variables
- Use CORS restrictions in production
- Implement proper authentication for production deployment

## 🚀 Performance Optimizations

- **Fast Path**: Profile analysis skips LLM when preferences exist
- **Vector DB Caching**: Embeddings are pre-computed
- **Connection Pooling**: HTTP clients are reused
- **Timeout Management**: 150-second timeouts prevent hanging
- **Retry Logic**: Exponential backoff for transient failures

## 🔮 Future Enhancements

- [ ] Redis caching layer
- [ ] PostgreSQL for production data storage
- [ ] WebSocket for real-time updates
- [ ] Microservices architecture
- [ ] Kubernetes deployment
- [ ] Monitoring & logging (Prometheus, Grafana)
- [ ] CI/CD pipeline
- [ ] Parent dashboard
- [ ] Story history
- [ ] Quiz retry functionality

## 📝 License

[Add your license information here]

## 👥 Contributing

[Add contributing guidelines here]

## 📧 Contact

[Add contact information here]

---

**Built with ❤️ for financial education**

