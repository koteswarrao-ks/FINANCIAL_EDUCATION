# Financial Education App - Architecture Diagram (Agno Framework)

## System Architecture Overview

```mermaid
graph TB
    subgraph "Frontend Layer (Angular)"
        UI[User Interface]
        Login[Login Component]
        Home[Home Component]
        Profile[Profile Analysis Component]
        Story[Story Generation Component]
        Quiz[Quiz Component]
        Rewards[Rewards Component]
        Leaderboard[Leaderboard Component]
        Service[User Profile Service]
        
        UI --> Login
        UI --> Home
        UI --> Profile
        UI --> Story
        UI --> Quiz
        UI --> Rewards
        UI --> Leaderboard
        Login --> Service
        Home --> Service
        Profile --> Service
        Story --> Service
        Quiz --> Service
        Rewards --> Service
        Leaderboard --> Service
    end
    
    subgraph "Backend API Layer (FastAPI)"
        API[FastAPI Server<br/>Port 8000]
        LoginEP[POST /api/login]
        StartEP[GET /api/start/:child_id]
        ProfileEP[POST /api/profile/analyze]
        StoryEP[POST /api/story/generate]
        QuizEP[POST /api/quiz/generate]
        SubmitEP[POST /api/submit_quiz/:child_id]
        RewardsEP[GET /api/rewards/:child_id]
        LeaderboardEP[GET /api/leaderboard]
        PrefsEP[GET/POST /api/profile/preferences]
        
        API --> LoginEP
        API --> StartEP
        API --> ProfileEP
        API --> StoryEP
        API --> QuizEP
        API --> SubmitEP
        API --> RewardsEP
        API --> LeaderboardEP
        API --> PrefsEP
    end
    
    subgraph "Agent Layer (Agno Framework)"
        Orchestrator[Orchestration Agent<br/>Agno Agent]
        ProfileAgent[Profile Agent<br/>Agno + Azure OpenAI]
        StoryAgent[Story Agent<br/>Agno + Azure OpenAI]
        QuizAgent[Quiz Agent<br/>Agno + Azure OpenAI]
        GamificationAgent[Gamification Agent<br/>Agno Tools]
        ProgressAgent[Learning Progress Agent<br/>Agno Tools]
        
        Orchestrator --> ProfileAgent
        Orchestrator --> StoryAgent
        Orchestrator --> QuizAgent
        Orchestrator --> ProgressAgent
        SubmitEP --> GamificationAgent
        SubmitEP --> ProgressAgent
    end
    
    subgraph "Agno Tools Layer"
        AgnoTools[Agno Tools Module]
        MCPTools[MCP Tools<br/>get_user_profile<br/>save_profile_preferences<br/>get_learning_progress<br/>etc.]
        RAGTools[RAG Tools<br/>retrieve_financial_concepts<br/>retrieve_financial_concepts_by_topic]
        ProgressTools[Progress Tools<br/>get_next_topic<br/>mark_topic_completed]
        
        AgnoTools --> MCPTools
        AgnoTools --> RAGTools
        AgnoTools --> ProgressTools
    end
    
    subgraph "Data Persistence Layer (MCP Server)"
        MCP[MCP Server<br/>Port 5001]
        UserData[User Data<br/>user_data.json]
        ProgressData[Learning Progress<br/>learning_progress.json]
        QuizHistory[Quiz History<br/>quiz_history.json]
        ProfilePrefs[Profile Preferences<br/>profile_preferences.json]
        GamificationData[Gamification Data<br/>gamification.json]
        
        MCP --> UserData
        MCP --> ProgressData
        MCP --> QuizHistory
        MCP --> ProfilePrefs
        MCP --> GamificationData
    end
    
    subgraph "RAG System (Direct ChromaDB)"
        VectorDB[Chroma Vector Database<br/>Direct Access]
        Embeddings[HuggingFace Embeddings<br/>sentence-transformers<br/>all-MiniLM-L6-v2]
        PDFs[Source PDFs<br/>Class 6-10 Financial Concepts]
        RAGRetriever[Semantic Retriever<br/>Direct ChromaDB Query]
        
        PDFs --> VectorDB
        Embeddings --> VectorDB
        VectorDB --> RAGRetriever
    end
    
    subgraph "External Services"
        AzureOpenAI[Azure OpenAI<br/>GPT-4o-mini<br/>Direct API Client]
        DiceBear[DiceBear Avatars API]
    end
    
    %% Frontend to Backend connections
    Service -->|HTTP REST| API
    
    %% Backend to Agents connections
    StartEP --> Orchestrator
    ProfileEP --> ProfileAgent
    StoryEP --> StoryAgent
    QuizEP --> QuizAgent
    
    %% Agents to Agno Tools
    ProfileAgent --> AgnoTools
    StoryAgent --> AgnoTools
    QuizAgent --> AgnoTools
    GamificationAgent --> AgnoTools
    ProgressAgent --> AgnoTools
    
    %% Agno Tools to MCP connections
    MCPTools -->|HTTP| MCP
    
    %% Agno Tools to RAG connections
    RAGTools --> RAGRetriever
    
    %% Agents to External Services
    ProfileAgent -->|Direct API| AzureOpenAI
    StoryAgent -->|Direct API| AzureOpenAI
    QuizAgent -->|Direct API| AzureOpenAI
    Service -->|Avatar URLs| DiceBear
    
    %% Styling
    classDef frontend fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    classDef backend fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef agent fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef agno fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    classDef data fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    classDef rag fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    classDef external fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    
    class UI,Login,Home,Profile,Story,Quiz,Rewards,Leaderboard,Service frontend
    class API,LoginEP,StartEP,ProfileEP,StoryEP,QuizEP,SubmitEP,RewardsEP,LeaderboardEP,PrefsEP backend
    class Orchestrator,ProfileAgent,StoryAgent,QuizAgent,GamificationAgent,ProgressAgent agent
    class AgnoTools,MCPTools,RAGTools,ProgressTools agno
    class MCP,UserData,ProgressData,QuizHistory,ProfilePrefs,GamificationData data
    class VectorDB,Embeddings,PDFs,RAGRetriever rag
    class AzureOpenAI,DiceBear external
```

## Data Flow Diagrams

### 1. Learning Journey Flow (Agno Framework)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Orchestrator
    participant ProfileAgent
    participant AgnoTools
    participant StoryAgent
    participant QuizAgent
    participant MCP
    participant RAG
    participant AzureOpenAI
    
    User->>Frontend: Click "Start Story"
    Frontend->>API: GET /api/start/:child_id
    API->>Orchestrator: Run orchestration
    
    Orchestrator->>ProfileAgent: Analyze profile
    ProfileAgent->>AgnoTools: get_user_profile(child_id)
    AgnoTools->>MCP: GET user_profile/:child_id
    MCP-->>AgnoTools: User data & transactions
    AgnoTools-->>ProfileAgent: User data
    ProfileAgent->>AgnoTools: retrieve_financial_concepts(query)
    AgnoTools->>RAG: Direct ChromaDB query
    RAG-->>AgnoTools: Relevant financial concepts
    AgnoTools-->>ProfileAgent: RAG results
    ProfileAgent->>AzureOpenAI: Direct API call (GPT-4o-mini)
    AzureOpenAI-->>ProfileAgent: Profile with hobbies, subjects, learning style
    ProfileAgent-->>Orchestrator: Profile data
    
    Orchestrator->>StoryAgent: Generate story
    StoryAgent->>AgnoTools: get_next_topic(child_id)
    AgnoTools->>MCP: GET learning_progress/:child_id
    MCP-->>AgnoTools: Current topic
    AgnoTools-->>StoryAgent: Next topic
    StoryAgent->>AgnoTools: retrieve_financial_concepts_by_topic(topic)
    AgnoTools->>RAG: Direct ChromaDB query by topic
    RAG-->>AgnoTools: Financial concept chunks
    AgnoTools-->>StoryAgent: Concept knowledge
    StoryAgent->>AzureOpenAI: Direct API call (GPT-4o-mini)
    AzureOpenAI-->>StoryAgent: Story with panels
    StoryAgent-->>Orchestrator: Story data
    
    Orchestrator->>QuizAgent: Generate quiz
    QuizAgent->>AgnoTools: get_quiz_history(child_id)
    AgnoTools->>MCP: GET quiz_history/:child_id
    MCP-->>AgnoTools: Weak/strong areas
    AgnoTools-->>QuizAgent: Quiz history
    QuizAgent->>AzureOpenAI: Direct API call (GPT-4o-mini)
    AzureOpenAI-->>QuizAgent: Quiz questions
    QuizAgent-->>Orchestrator: Quiz data
    
    Orchestrator-->>API: Complete learning package
    API-->>Frontend: Profile + Story + Quiz
    Frontend-->>User: Display story
```

### 2. Quiz Submission Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant GamificationAgent
    participant AgnoTools
    participant ProgressAgent
    participant MCP
    
    User->>Frontend: Submit quiz answers
    Frontend->>API: POST /api/submit_quiz/:child_id
    API->>API: Calculate score
    
    API->>GamificationAgent: Update points & badges
    GamificationAgent->>AgnoTools: get_gamification(child_id)
    AgnoTools->>MCP: GET gamification/:child_id
    MCP-->>AgnoTools: Current points, level, badges
    AgnoTools-->>GamificationAgent: Gamification data
    GamificationAgent->>GamificationAgent: Add points, update level
    GamificationAgent->>AgnoTools: save_gamification(child_id, data)
    AgnoTools->>MCP: POST gamification/:child_id
    MCP-->>AgnoTools: Saved
    AgnoTools-->>GamificationAgent: Success
    
    API->>AgnoTools: save_quiz_history(child_id, history)
    AgnoTools->>MCP: POST quiz_history/:child_id
    MCP-->>AgnoTools: Quiz history updated
    
    alt Score >= 70%
        API->>ProgressAgent: Mark topic completed
        ProgressAgent->>AgnoTools: mark_topic_completed(child_id, topic)
        AgnoTools->>MCP: POST learning_progress/:child_id
        MCP-->>AgnoTools: Progress updated
        AgnoTools-->>ProgressAgent: Success
    end
    
    API-->>Frontend: Score, gamification, progress
    Frontend-->>User: Show results & rewards
```

### 3. Profile Analysis Flow (Fast Path)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant ProfileAgent
    participant AgnoTools
    participant MCP
    participant RAG
    participant AzureOpenAI
    
    User->>Frontend: View profile
    Frontend->>API: POST /api/profile/analyze
    
    API->>AgnoTools: get_profile_preferences(child_id)
    AgnoTools->>MCP: GET profile_preferences/:child_id
    MCP-->>AgnoTools: Existing preferences (if any)
    AgnoTools-->>API: Preferences
    
    alt Preferences exist (Fast Path)
        API->>AgnoTools: get_user_profile(child_id)
        AgnoTools->>MCP: GET user_profile/:child_id
        MCP-->>AgnoTools: User data
        AgnoTools-->>API: User data
        API->>API: Build quick profile (no LLM)
        API-->>Frontend: Quick profile response
    else No preferences (LLM Path)
        API->>ProfileAgent: Analyze profile
        ProfileAgent->>AgnoTools: get_user_profile(child_id)
        AgnoTools->>MCP: GET user_profile/:child_id
        MCP-->>AgnoTools: Transactions & basic profile
        AgnoTools-->>ProfileAgent: User data
        ProfileAgent->>AgnoTools: retrieve_financial_concepts(query)
        AgnoTools->>RAG: Direct ChromaDB semantic search
        RAG-->>AgnoTools: Relevant financial concepts
        AgnoTools-->>ProfileAgent: RAG results
        ProfileAgent->>AzureOpenAI: Direct API call (GPT-4o-mini)
        AzureOpenAI-->>ProfileAgent: Personalized profile
        ProfileAgent->>AgnoTools: save_profile_preferences(child_id, prefs)
        AgnoTools->>MCP: POST profile_preferences/:child_id
        ProfileAgent-->>API: Profile with LLM details
        API-->>Frontend: Analyzed profile
    end
    
    Frontend-->>User: Display profile insights
```

## Component Architecture

### Agno Tools Architecture

```mermaid
graph TB
    subgraph "Agno Tools Module"
        AgnoTools[agno_tools.py]
        
        subgraph "MCP Tools"
            GetProfile[get_user_profile]
            SavePrefs[save_profile_preferences]
            GetProgress[get_learning_progress]
            SaveProgress[save_learning_progress]
            GetQuiz[get_quiz_history]
            SaveQuiz[save_quiz_history]
            GetGamification[get_gamification]
            SaveGamification[save_gamification]
        end
        
        subgraph "RAG Tools"
            RetrieveConcepts[retrieve_financial_concepts]
            RetrieveByTopic[retrieve_financial_concepts_by_topic]
        end
        
        subgraph "Progress Tools"
            GetNextTopic[get_next_topic]
            MarkCompleted[mark_topic_completed]
        end
        
        AgnoTools --> GetProfile
        AgnoTools --> SavePrefs
        AgnoTools --> GetProgress
        AgnoTools --> SaveProgress
        AgnoTools --> GetQuiz
        AgnoTools --> SaveQuiz
        AgnoTools --> GetGamification
        AgnoTools --> SaveGamification
        AgnoTools --> RetrieveConcepts
        AgnoTools --> RetrieveByTopic
        AgnoTools --> GetNextTopic
        AgnoTools --> MarkCompleted
    end
    
    subgraph "Agents Using Tools"
        ProfileAgent[Profile Agent]
        StoryAgent[Story Agent]
        QuizAgent[Quiz Agent]
        GamificationAgent[Gamification Agent]
        ProgressAgent[Learning Progress Agent]
    end
    
    ProfileAgent --> AgnoTools
    StoryAgent --> AgnoTools
    QuizAgent --> AgnoTools
    GamificationAgent --> AgnoTools
    ProgressAgent --> AgnoTools
```

## Technology Stack

### Frontend
- **Framework**: Angular
- **Language**: TypeScript
- **HTTP Client**: Angular HttpClient
- **Styling**: CSS3 with Flexbox/Grid
- **Avatar Service**: DiceBear Avatars API

### Backend
- **Framework**: FastAPI
- **Language**: Python 3
- **Agent Framework**: Agno
- **LLM**: Azure OpenAI (GPT-4o-mini) - Direct API Client
- **Vector DB**: Chroma (Direct Access, no LangChain)
- **Embeddings**: HuggingFace (sentence-transformers/all-MiniLM-L6-v2)
- **Data Storage**: JSON files via MCP Server

### Infrastructure
- **API Server**: Uvicorn (ASGI)
- **MCP Server**: FastAPI (Port 5001)
- **Backend API**: FastAPI (Port 8000)
- **Frontend**: Angular Dev Server (Port 4200)

## Key Design Patterns

1. **Agno Framework**: All agents and tools use Agno framework
2. **Multi-Agent System**: Specialized agents for different tasks
3. **Orchestration Pattern**: Central agent coordinates workflow
4. **RAG (Retrieval-Augmented Generation)**: Direct ChromaDB + LLM
5. **Service Layer Pattern**: Frontend service abstracts API calls
6. **Repository Pattern**: MCP Server acts as data repository
7. **Fast Path Optimization**: Skip LLM when preferences exist
8. **Tool Pattern**: Agno tools encapsulate MCP and RAG operations

## Agent-Tool Interaction

```mermaid
graph LR
    Agent[Agno Agent]
    Tool[Agno Tool<br/>@tool decorator]
    Impl[Implementation Function]
    External[External Service<br/>MCP/RAG/Azure OpenAI]
    
    Agent -->|Calls| Tool
    Tool -->|entrypoint| Impl
    Impl -->|HTTP/Direct| External
    External -->|Response| Impl
    Impl -->|Result| Tool
    Tool -->|Result| Agent
```

## Migration from LangChain

- ✅ **Removed**: All LangChain dependencies
- ✅ **Replaced**: LangChain tools → Agno tools
- ✅ **Replaced**: LangChain LLM → Direct Azure OpenAI client
- ✅ **Replaced**: LangChain ChromaDB → Direct ChromaDB access
- ✅ **Added**: Agno framework for agents and tools
- ✅ **Simplified**: Fewer dependencies, cleaner code

## Performance Optimizations

1. **Fast Path for Profile**: Skip LLM when preferences exist
2. **Direct API Calls**: No LangChain overhead
3. **Connection Pooling**: HTTP client reuse
4. **Timeout Management**: 120s timeout for LLM calls
5. **Retry Logic**: 2-3 attempts with exponential backoff
6. **Caching**: Vector DB caches embeddings

