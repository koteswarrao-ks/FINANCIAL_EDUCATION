# Financial Education App - System Design Document

## Table of Contents
1. [System Overview](#system-overview)
2. [High-Level System Design](#high-level-system-design)
3. [Component Design](#component-design)
4. [Data Flow Design](#data-flow-design)
5. [API Design](#api-design)
6. [Database/Storage Design](#databasestorage-design)
7. [Scalability & Performance](#scalability--performance)
8. [Security Design](#security-design)
9. [Error Handling & Resilience](#error-handling--resilience)
10. [Deployment Design](#deployment-design)

---

## System Overview

The Financial Education App is a personalized learning platform that uses AI agents to create customized financial education content for children. The system combines RAG (Retrieval-Augmented Generation) with multi-agent orchestration to deliver personalized stories, quizzes, and gamified learning experiences.

### Key Requirements
- **Personalization**: Content tailored to each child's interests, learning style, and progress
- **Scalability**: Support multiple concurrent users
- **Performance**: Fast response times (< 3s for non-LLM operations)
- **Reliability**: Graceful error handling and fallbacks
- **Extensibility**: Easy to add new agents and features

---

## High-Level System Design

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        Mobile[Mobile App<br/>Future]
    end
    
    subgraph "Presentation Layer"
        Angular[Angular Frontend<br/>Port 4200]
        Router[Angular Router]
        Components[UI Components]
        Services[Angular Services]
    end
    
    subgraph "API Gateway Layer"
        FastAPI[FastAPI Server<br/>Port 8000]
        CORS[CORS Middleware]
        Auth[Auth Middleware]
        RateLimit[Rate Limiting<br/>Future]
    end
    
    subgraph "Business Logic Layer"
        Orchestrator[Orchestration Agent]
        ProfileAgent[Profile Agent]
        StoryAgent[Story Agent]
        QuizAgent[Quiz Agent]
        GamificationAgent[Gamification Agent]
        ProgressAgent[Learning Progress Agent]
    end
    
    subgraph "Data Access Layer"
        MCPServer[MCP Server<br/>Port 5001]
        UserRepo[User Repository]
        ProgressRepo[Progress Repository]
        QuizRepo[Quiz Repository]
        GamificationRepo[Gamification Repository]
    end
    
    subgraph "Knowledge Base Layer"
        RAGSystem[RAG System]
        VectorDB[Chroma Vector DB]
        Embeddings[Embedding Model]
        PDFStore[PDF Storage]
    end
    
    subgraph "External Services"
        AzureOpenAI[Azure OpenAI<br/>GPT-4o-mini]
        DiceBear[DiceBear Avatars]
    end
    
    subgraph "Storage Layer"
        JSONFiles[JSON Files<br/>User Data]
        VectorStore[Vector Store<br/>Embeddings]
    end
    
    Browser --> Angular
    Mobile -.-> Angular
    Angular --> Router
    Router --> Components
    Components --> Services
    Services -->|HTTP/REST| FastAPI
    
    FastAPI --> CORS
    FastAPI --> Auth
    FastAPI --> RateLimit
    FastAPI --> Orchestrator
    
    Orchestrator --> ProfileAgent
    Orchestrator --> StoryAgent
    Orchestrator --> QuizAgent
    
    ProfileAgent --> MCPServer
    StoryAgent --> MCPServer
    QuizAgent --> MCPServer
    GamificationAgent --> MCPServer
    ProgressAgent --> MCPServer
    
    MCPServer --> UserRepo
    MCPServer --> ProgressRepo
    MCPServer --> QuizRepo
    MCPServer --> GamificationRepo
    
    ProfileAgent --> RAGSystem
    StoryAgent --> RAGSystem
    RAGSystem --> VectorDB
    RAGSystem --> Embeddings
    RAGSystem --> PDFStore
    
    ProfileAgent --> AzureOpenAI
    StoryAgent --> AzureOpenAI
    QuizAgent --> AzureOpenAI
    
    Services --> DiceBear
    
    UserRepo --> JSONFiles
    ProgressRepo --> JSONFiles
    QuizRepo --> JSONFiles
    GamificationRepo --> JSONFiles
    VectorDB --> VectorStore
    
    classDef client fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef presentation fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef api fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef business fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    classDef data fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef knowledge fill:#fff9c4,stroke:#f9a825,stroke-width:2px
    classDef external fill:#e0f2f1,stroke:#00796b,stroke-width:2px
    classDef storage fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    
    class Browser,Mobile client
    class Angular,Router,Components,Services presentation
    class FastAPI,CORS,Auth,RateLimit api
    class Orchestrator,ProfileAgent,StoryAgent,QuizAgent,GamificationAgent,ProgressAgent business
    class MCPServer,UserRepo,ProgressRepo,QuizRepo,GamificationRepo data
    class RAGSystem,VectorDB,Embeddings,PDFStore knowledge
    class AzureOpenAI,DiceBear external
    class JSONFiles,VectorStore storage
```

---

## Component Design

### 1. Frontend Component Design

```mermaid
graph LR
    subgraph "Angular Application"
        App[AppComponent<br/>Root Component]
        
        subgraph "Feature Modules"
            AuthModule[Authentication Module]
            LearningModule[Learning Module]
            ProfileModule[Profile Module]
            RewardsModule[Rewards Module]
        end
        
        subgraph "Shared Services"
            UserService[UserProfileService<br/>HTTP Client]
            AuthService[AuthService<br/>Future]
            StateService[StateService<br/>Future]
        end
        
        subgraph "UI Components"
            Login[LoginComponent]
            Home[HomeComponent]
            Profile[ProfileAnalysisComponent]
            Story[StoryGenerationComponent]
            Quiz[QuizComponent]
            Rewards[RewardsComponent]
            Leaderboard[LeaderboardComponent]
        end
    end
    
    App --> AuthModule
    App --> LearningModule
    App --> ProfileModule
    App --> RewardsModule
    
    AuthModule --> Login
    LearningModule --> Story
    LearningModule --> Quiz
    ProfileModule --> Profile
    RewardsModule --> Rewards
    RewardsModule --> Leaderboard
    
    Login --> UserService
    Home --> UserService
    Profile --> UserService
    Story --> UserService
    Quiz --> UserService
    Rewards --> UserService
    Leaderboard --> UserService
    
    UserService -->|HTTP| Backend[Backend API]
```

### 2. Backend Agent Design

```mermaid
classDiagram
    class Agent {
        <<abstract>>
        +run(input: dict) dict
        +validate_input(input: dict) bool
        +handle_error(error: Exception) dict
    }
    
    class OrchestrationAgent {
        -profile_agent: ProfileAgent
        -story_agent: StoryAgent
        -quiz_agent: QuizAgent
        +run(child_id: str) dict
        +coordinate_pipeline() dict
    }
    
    class ProfileAgent {
        -mcp_client: MCPClient
        -rag_retriever: RAGRetriever
        -llm_client: AzureOpenAI
        +analyze_profile(child_id: str) Profile
        +infer_preferences(transactions: list) dict
        +merge_user_preferences() dict
    }
    
    class StoryAgent {
        -progress_manager: ProgressManager
        -rag_retriever: RAGRetriever
        -llm_client: AzureOpenAI
        +generate_story(profile: Profile) Story
        +get_next_topic(child_id: str) str
        +retrieve_concept_knowledge(topic: str) str
    }
    
    class QuizAgent {
        -quiz_history: QuizHistory
        -llm_client: AzureOpenAI
        +generate_quiz(story: Story, profile: Profile) Quiz
        +adapt_difficulty(history: dict) str
        +personalize_questions() list
    }
    
    class GamificationAgent {
        -mcp_client: MCPClient
        +calculate_points(score: int) int
        +update_level(points: int) int
        +assign_badge(concept: str) str
    }
    
    class ProgressAgent {
        -mcp_client: MCPClient
        +get_next_topic(child_id: str) str
        +mark_completed(child_id: str, topic: str) bool
        +load_progress(child_id: str) dict
    }
    
    Agent <|-- OrchestrationAgent
    Agent <|-- ProfileAgent
    Agent <|-- StoryAgent
    Agent <|-- QuizAgent
    Agent <|-- GamificationAgent
    Agent <|-- ProgressAgent
    
    OrchestrationAgent --> ProfileAgent
    OrchestrationAgent --> StoryAgent
    OrchestrationAgent --> QuizAgent
    OrchestrationAgent --> ProgressAgent
```

### 3. RAG System Design

```mermaid
graph TB
    subgraph "Ingestion Pipeline"
        PDFs[Source PDFs<br/>Class 6-10]
        Extractor[PDF Extractor<br/>extract_pdf_content.py]
        Chunker[Text Chunker<br/>Split into chunks]
        Embedder[Embedding Generator<br/>HuggingFace Model]
        Ingest[Ingestion Script<br/>ingest_kb.py]
    end
    
    subgraph "Vector Database"
        Chroma[Chroma DB]
        Collection[Financial Concepts<br/>Collection]
        Metadata[Metadata Index]
    end
    
    subgraph "Retrieval Pipeline"
        Query[User Query]
        QueryEmbed[Query Embedding]
        Similarity[Similarity Search<br/>Cosine Similarity]
        TopK[Top-K Retrieval<br/>K=5]
        Context[Context Assembly]
    end
    
    subgraph "Generation Pipeline"
        Prompt[Prompt Builder]
        LLM[Azure OpenAI]
        Response[Generated Response]
    end
    
    PDFs --> Extractor
    Extractor --> Chunker
    Chunker --> Embedder
    Embedder --> Ingest
    Ingest --> Chroma
    
    Chroma --> Collection
    Chroma --> Metadata
    
    Query --> QueryEmbed
    QueryEmbed --> Similarity
    Similarity --> TopK
    TopK --> Context
    
    Context --> Prompt
    Prompt --> LLM
    LLM --> Response
```

---

## Data Flow Design

### 1. Complete Learning Journey Flow

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant F as Frontend
    participant API as FastAPI
    participant O as Orchestrator
    participant P as Profile Agent
    participant S as Story Agent
    participant Q as Quiz Agent
    participant MCP as MCP Server
    participant RAG as RAG System
    participant LLM as Azure OpenAI
    
    U->>F: Click "Start Story"
    F->>API: GET /api/start/:child_id
    API->>O: Run orchestration
    
    Note over O: Step 1: Profile Analysis
    O->>P: Analyze profile(child_id)
    P->>MCP: GET /user_profile/:child_id
    MCP-->>P: User data + transactions
    P->>MCP: GET /profile_preferences/:child_id
    MCP-->>P: Existing preferences (if any)
    
    alt Fast Path (Preferences exist)
        P->>P: Build quick profile (no LLM)
    else LLM Path (No preferences)
        P->>RAG: Semantic search(transactions)
        RAG-->>P: Relevant financial concepts
        P->>LLM: Generate personalized profile
        LLM-->>P: Profile with hobbies, subjects
        P->>MCP: Auto-save preferences (first time)
    end
    P-->>O: Profile data
    
    Note over O: Step 2: Story Generation
    O->>S: Generate story(profile)
    S->>MCP: GET /learning_progress/:child_id
    MCP-->>S: Current topic
    S->>RAG: Retrieve concept knowledge(topic)
    RAG-->>S: Financial concept chunks
    S->>LLM: Generate personalized story
    LLM-->>S: Story with panels
    S-->>O: Story data
    
    Note over O: Step 3: Quiz Generation
    O->>Q: Generate quiz(story, profile)
    Q->>MCP: GET /quiz_history/:child_id
    MCP-->>Q: Weak/strong areas
    Q->>LLM: Generate adaptive quiz
    LLM-->>Q: Quiz questions
    Q-->>O: Quiz data
    
    O-->>API: Complete learning package
    API-->>F: Profile + Story + Quiz + Progress
    F-->>U: Display story
```

### 2. Quiz Submission & Gamification Flow

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant F as Frontend
    participant API as FastAPI
    participant G as Gamification Agent
    participant Prog as Progress Agent
    participant MCP as MCP Server
    
    U->>F: Submit quiz answers
    F->>API: POST /api/submit_quiz/:child_id
    
    Note over API: Calculate Score
    API->>API: Calculate score (correct/total)
    
    Note over API: Update Gamification
    API->>G: Update gamification(score, concept)
    G->>MCP: GET /gamification/:child_id
    MCP-->>G: Current points, level, badges
    G->>G: Calculate new points
    G->>G: Update level
    G->>G: Assign badge (if score >= 70)
    G->>MCP: POST /gamification/:child_id
    MCP-->>G: Saved
    
    Note over API: Update Quiz History
    API->>MCP: GET /quiz_history/:child_id
    MCP-->>API: Quiz history
    API->>API: Update weak/strong areas
    API->>MCP: POST /quiz_history/:child_id
    MCP-->>API: Saved
    
    alt Score >= 70%
        Note over API: Mark Topic Completed
        API->>Prog: Mark topic completed(child_id, concept)
        Prog->>MCP: GET /learning_progress/:child_id
        MCP-->>Prog: Current progress
        Prog->>Prog: Move topic to completed
        Prog->>Prog: Update current topic
        Prog->>MCP: POST /learning_progress/:child_id
        MCP-->>Prog: Saved
        Prog-->>API: Updated progress
    end
    
    API-->>F: Score, gamification, progress, nextStoryAvailable
    F-->>U: Show results & rewards
```

---

## API Design

### API Endpoint Structure

```mermaid
graph TB
    subgraph "Authentication"
        Login[POST /api/login]
    end
    
    subgraph "Learning Journey"
        Start[GET /api/start/:child_id]
        SubmitQuiz[POST /api/submit_quiz/:child_id]
    end
    
    subgraph "Profile Management"
        AnalyzeProfile[POST /api/profile/analyze]
        GetPreferences[GET /api/profile/preferences/:child_id]
        UpdatePreferences[POST /api/profile/preferences]
    end
    
    subgraph "Content Generation"
        GenerateStory[POST /api/story/generate]
        GenerateQuiz[POST /api/quiz/generate]
    end
    
    subgraph "Gamification"
        GetRewards[GET /api/rewards/:child_id]
        GetLeaderboard[GET /api/leaderboard]
    end
    
    API[FastAPI Server] --> Login
    API --> Start
    API --> SubmitQuiz
    API --> AnalyzeProfile
    API --> GetPreferences
    API --> UpdatePreferences
    API --> GenerateStory
    API --> GenerateQuiz
    API --> GetRewards
    API --> GetLeaderboard
```

### API Request/Response Models

```mermaid
classDiagram
    class LoginRequest {
        +string username
        +string password
    }
    
    class LoginResponse {
        +bool success
        +string childId
        +string name
    }
    
    class ProfileRequest {
        +string child_id
    }
    
    class ProfileResponse {
        +bool success
        +Profile profile
        +dict reasoning
        +dict llm_call_details
    }
    
    class StoryRequest {
        +Profile profile
    }
    
    class StoryResponse {
        +bool success
        +Story story
        +dict llm_call_details
    }
    
    class QuizSubmission {
        +string quizId
        +string concept
        +dict answers
        +dict correctAnswers
    }
    
    class QuizResponse {
        +bool success
        +int score
        +bool passed
        +dict gamification
        +dict progress
        +bool nextStoryAvailable
    }
    
    class RewardsResponse {
        +bool success
        +int points
        +int level
        +list badges
    }
    
    LoginRequest --> LoginResponse
    ProfileRequest --> ProfileResponse
    StoryRequest --> StoryResponse
    QuizSubmission --> QuizResponse
```

---

## Database/Storage Design

### Data Storage Architecture

```mermaid
graph TB
    subgraph "MCP Server (Port 5001)"
        MCP[MCP Server]
        
        subgraph "JSON File Storage"
            UserData[user_data.json<br/>Array of children]
            Progress[learning_progress.json<br/>Array of progress]
            QuizHist[quiz_history.json<br/>Array of history]
            ProfilePrefs[profile_preferences.json<br/>Array of preferences]
            Gamification[gamification.json<br/>Array of gamification]
        end
    end
    
    subgraph "Vector Database"
        Chroma[Chroma DB]
        Embeddings[Embedding Vectors]
        Metadata[Document Metadata]
    end
    
    subgraph "File System"
        PDFs[PDF Files<br/>Class 6-10]
        Config[Config Files<br/>.env]
    end
    
    MCP --> UserData
    MCP --> Progress
    MCP --> QuizHist
    MCP --> ProfilePrefs
    MCP --> Gamification
    
    Chroma --> Embeddings
    Chroma --> Metadata
    
    PDFs -.->|Ingestion| Chroma
```

### Data Model Relationships

```mermaid
erDiagram
    USER ||--o{ PROGRESS : has
    USER ||--o{ QUIZ_HISTORY : has
    USER ||--|| PROFILE_PREFS : has
    USER ||--|| GAMIFICATION : has
    
    PROGRESS ||--o{ TOPIC : contains
    QUIZ_HISTORY ||--o{ QUIZ_ATTEMPT : contains
    GAMIFICATION ||--o{ BADGE : contains
    
    USER {
        string childId PK
        string username
        string password
        string name
        int age
        string grade
        string country
        array transactions
    }
    
    PROGRESS {
        string childId PK
        array completedTopics
        array pendingTopics
        string currentTopic
    }
    
    QUIZ_HISTORY {
        string childId PK
        dict conceptHistory
        array weakAreas
        array strongAreas
    }
    
    PROFILE_PREFS {
        string childId PK
        array hobbies
        array favoriteSubjects
    }
    
    GAMIFICATION {
        string childId PK
        int points
        int level
        array badges
    }
```

---

## Scalability & Performance

### Performance Optimization Strategies

```mermaid
graph TB
    subgraph "Caching Layer"
        ProfileCache[Profile Cache<br/>Fast Path]
        RAGCache[RAG Cache<br/>Vector DB]
        LLMCache[LLM Response Cache<br/>Future]
    end
    
    subgraph "Optimization Techniques"
        FastPath[Fast Path<br/>Skip LLM if data exists]
        ConnectionPool[HTTP Connection Pooling]
        AsyncOps[Async Operations<br/>Future]
        BatchOps[Batch Operations<br/>Future]
    end
    
    subgraph "Performance Monitoring"
        Metrics[Performance Metrics<br/>Future]
        Logging[Structured Logging<br/>Future]
        Tracing[Distributed Tracing<br/>Future]
    end
    
    ProfileCache --> FastPath
    RAGCache --> FastPath
    ConnectionPool --> AsyncOps
    AsyncOps --> BatchOps
    Metrics --> Logging
    Logging --> Tracing
```

### Scalability Architecture

```mermaid
graph TB
    subgraph "Current Architecture"
        SingleAPI[Single FastAPI Instance]
        SingleMCP[Single MCP Server]
        FileStorage[File-based Storage]
    end
    
    subgraph "Scalable Architecture (Future)"
        LoadBalancer[Load Balancer]
        API1[API Instance 1]
        API2[API Instance 2]
        API3[API Instance N]
        
        RedisCache[Redis Cache]
        PostgresDB[PostgreSQL Database]
        VectorDBCluster[Vector DB Cluster]
        
        Queue[Message Queue<br/>RabbitMQ/Kafka]
        Worker1[Worker 1]
        Worker2[Worker 2]
        WorkerN[Worker N]
    end
    
    LoadBalancer --> API1
    LoadBalancer --> API2
    LoadBalancer --> API3
    
    API1 --> RedisCache
    API2 --> RedisCache
    API3 --> RedisCache
    
    API1 --> PostgresDB
    API2 --> PostgresDB
    API3 --> PostgresDB
    
    API1 --> VectorDBCluster
    API2 --> VectorDBCluster
    API3 --> VectorDBCluster
    
    API1 --> Queue
    API2 --> Queue
    API3 --> Queue
    
    Queue --> Worker1
    Queue --> Worker2
    Queue --> WorkerN
```

---

## Security Design

### Security Architecture

```mermaid
graph TB
    subgraph "Frontend Security"
        HTTPS[HTTPS/TLS]
        XSSProtection[XSS Protection]
        CSRFProtection[CSRF Protection]
        InputValidation[Input Validation]
    end
    
    subgraph "API Security"
        CORS[CORS Configuration]
        RateLimiting[Rate Limiting]
        AuthMiddleware[Authentication Middleware]
        InputSanitization[Input Sanitization]
    end
    
    subgraph "Data Security"
        Encryption[Data Encryption<br/>At Rest]
        SecureStorage[Secure Storage]
        AccessControl[Access Control]
    end
    
    subgraph "External Services"
        APIKeyManagement[API Key Management<br/>Environment Variables]
        SecureConnections[Secure Connections<br/>TLS]
    end
    
    HTTPS --> CORS
    XSSProtection --> InputValidation
    CSRFProtection --> AuthMiddleware
    RateLimiting --> InputSanitization
    Encryption --> SecureStorage
    SecureStorage --> AccessControl
    APIKeyManagement --> SecureConnections
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as FastAPI
    participant MCP as MCP Server
    participant DB as User Data
    
    U->>F: Enter username/password
    F->>API: POST /api/login
    API->>MCP: POST /login
    MCP->>DB: Query user_data.json
    DB-->>MCP: User record
    MCP->>MCP: Validate credentials
    alt Valid Credentials
        MCP-->>API: {success: true, childId, name}
        API-->>F: Login success + childId
        F->>F: Store childId in service
        F-->>U: Redirect to home
    else Invalid Credentials
        MCP-->>API: Error 401
        API-->>F: Login failed
        F-->>U: Show error message
    end
```

---

## Error Handling & Resilience

### Error Handling Strategy

```mermaid
graph TB
    subgraph "Error Types"
        ClientError[4xx Client Errors]
        ServerError[5xx Server Errors]
        NetworkError[Network Errors]
        LLMError[LLM API Errors]
        TimeoutError[Timeout Errors]
    end
    
    subgraph "Error Handling"
        Validation[Input Validation]
        RetryLogic[Retry Logic<br/>3 attempts]
        Fallback[Fallback Mechanisms]
        ErrorLogging[Error Logging]
        UserFeedback[User-Friendly Messages]
    end
    
    subgraph "Resilience Patterns"
        CircuitBreaker[Circuit Breaker<br/>Future]
        Bulkhead[Bulkhead Pattern<br/>Future]
        Timeout[Timeout Management<br/>150s for LLM]
        GracefulDegradation[Graceful Degradation]
    end
    
    ClientError --> Validation
    ServerError --> RetryLogic
    NetworkError --> RetryLogic
    LLMError --> RetryLogic
    TimeoutError --> Timeout
    
    Validation --> UserFeedback
    RetryLogic --> Fallback
    Fallback --> GracefulDegradation
    ErrorLogging --> CircuitBreaker
    Timeout --> Bulkhead
```

### Retry Strategy

```mermaid
sequenceDiagram
    participant Agent
    participant LLM as Azure OpenAI
    participant Retry as Retry Handler
    
    Agent->>LLM: API Call (Attempt 1)
    alt Success
        LLM-->>Agent: Response
    else Error (Connection/Timeout)
        LLM-->>Retry: Error
        Retry->>Retry: Wait 3 seconds
        Retry->>LLM: API Call (Attempt 2)
        alt Success
            LLM-->>Agent: Response
        else Error
            LLM-->>Retry: Error
            Retry->>Retry: Wait 3 seconds
            Retry->>LLM: API Call (Attempt 3)
            alt Success
                LLM-->>Agent: Response
            else Final Error
                LLM-->>Agent: Error (return with error details)
            end
        end
    end
```

---

## Deployment Design

### Current Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        DevFrontend[Angular Dev Server<br/>localhost:4200]
        DevBackend[FastAPI Server<br/>localhost:8000]
        DevMCP[MCP Server<br/>localhost:5001]
        DevFiles[Local File System]
    end
    
    subgraph "Production Environment (Future)"
        subgraph "Frontend"
            CDN[CDN<br/>Static Assets]
            WebServer[Nginx/Apache]
        end
        
        subgraph "Backend"
            AppServer1[FastAPI Instance 1]
            AppServer2[FastAPI Instance 2]
            LoadBalancer[Load Balancer]
        end
        
        subgraph "Data Layer"
            Database[PostgreSQL]
            Redis[Redis Cache]
            VectorDB[Vector DB Cluster]
        end
        
        subgraph "Infrastructure"
            Docker[Docker Containers]
            K8s[Kubernetes<br/>Future]
            Monitoring[Monitoring Stack]
        end
    end
    
    DevFrontend --> DevBackend
    DevBackend --> DevMCP
    DevMCP --> DevFiles
    
    CDN --> WebServer
    WebServer --> LoadBalancer
    LoadBalancer --> AppServer1
    LoadBalancer --> AppServer2
    AppServer1 --> Database
    AppServer2 --> Database
    AppServer1 --> Redis
    AppServer2 --> Redis
    AppServer1 --> VectorDB
    AppServer2 --> VectorDB
    
    Docker --> K8s
    K8s --> Monitoring
```

### Container Architecture (Future)

```mermaid
graph TB
    subgraph "Docker Compose"
        FrontendContainer[Frontend Container<br/>Angular]
        BackendContainer[Backend Container<br/>FastAPI]
        MCPContainer[MCP Container<br/>MCP Server]
        PostgresContainer[PostgreSQL Container]
        RedisContainer[Redis Container]
        VectorDBContainer[Vector DB Container]
    end
    
    FrontendContainer --> BackendContainer
    BackendContainer --> MCPContainer
    BackendContainer --> PostgresContainer
    BackendContainer --> RedisContainer
    BackendContainer --> VectorDBContainer
    MCPContainer --> PostgresContainer
```

---

## System Metrics & Monitoring (Future)

### Key Performance Indicators

```mermaid
graph LR
    subgraph "Performance Metrics"
        ResponseTime[Response Time<br/>P50, P95, P99]
        Throughput[Throughput<br/>Requests/sec]
        ErrorRate[Error Rate<br/>%]
        Latency[Latency<br/>ms]
    end
    
    subgraph "Business Metrics"
        ActiveUsers[Active Users]
        CompletionRate[Quiz Completion Rate]
        Engagement[User Engagement]
        LearningProgress[Learning Progress]
    end
    
    subgraph "System Metrics"
        CPUUsage[CPU Usage]
        MemoryUsage[Memory Usage]
        DiskIO[Disk I/O]
        NetworkIO[Network I/O]
    end
    
    subgraph "LLM Metrics"
        LLMLatency[LLM Call Latency]
        LLMCost[LLM API Cost]
        LLMErrors[LLM Error Rate]
        CacheHitRate[Cache Hit Rate]
    end
```

---

## Design Patterns Used

1. **Multi-Agent Pattern**: Specialized agents for different tasks
2. **Orchestration Pattern**: Central coordinator for workflow
3. **Repository Pattern**: MCP Server abstracts data access
4. **Service Layer Pattern**: Frontend services abstract API calls
5. **RAG Pattern**: Retrieval-Augmented Generation for knowledge
6. **Fast Path Pattern**: Optimize common cases
7. **Retry Pattern**: Handle transient failures
8. **Fallback Pattern**: Graceful degradation

---

## Future Enhancements

### Planned Improvements

1. **Caching Layer**
   - Redis for session management
   - Response caching for LLM calls
   - CDN for static assets

2. **Database Migration**
   - PostgreSQL for production data
   - Connection pooling
   - Database replication

3. **Message Queue**
   - Async processing for LLM calls
   - Background job processing
   - Event-driven architecture

4. **Monitoring & Observability**
   - Prometheus for metrics
   - Grafana for dashboards
   - ELK stack for logging

5. **Security Enhancements**
   - JWT tokens for authentication
   - OAuth2 integration
   - Rate limiting per user
   - API versioning

6. **Scalability**
   - Horizontal scaling
   - Auto-scaling based on load
   - Microservices architecture
   - Kubernetes deployment

---

## Conclusion

This system design provides a scalable, maintainable architecture for the Financial Education App. The current implementation focuses on functionality and personalization, while the design includes clear paths for future scalability and production deployment.

