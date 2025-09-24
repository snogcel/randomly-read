# System Architecture Diagram

```mermaid
graph TB
    %% Client Layer
    subgraph "Client Layer (React SPA)"
        UI[React Components]
        Router[React Router]
        State[Redux Store]
        Apollo[Apollo Client]
        UI --> Router
        UI --> State
        UI --> Apollo
    end

    %% Network Layer
    subgraph "Network Layer"
        HTTP[HTTP/REST API]
        GraphQL[GraphQL Endpoint]
        WS[WebSocket/Real-time]
    end

    %% Server Layer
    subgraph "Server Layer (Node.js/Express)"
        App[Express App]
        Routes[REST Routes]
        Resolvers[GraphQL Resolvers]
        Auth[Authentication]
        Middleware[Middleware Stack]
        
        App --> Routes
        App --> Resolvers
        App --> Auth
        App --> Middleware
    end

    %% Business Logic
    subgraph "Business Logic"
        Controllers[Controllers]
        Models[Data Models]
        Services[Business Services]
        
        Controllers --> Models
        Controllers --> Services
    end

    %% Data Layer
    subgraph "Data Layer"
        MongoDB[(MongoDB)]
        MySQL[(MySQL/Sequelize)]
        FileSystem[File System]
    end

    %% External Services
    subgraph "External Services"
        Email[Email Service]
        Analytics[Google Analytics]
        CDN[Static Assets]
    end

    %% Connections
    Apollo -.->|GraphQL Queries| GraphQL
    UI -.->|HTTP Requests| HTTP
    
    HTTP --> Routes
    GraphQL --> Resolvers
    
    Routes --> Controllers
    Resolvers --> Controllers
    
    Controllers --> MongoDB
    Controllers --> MySQL
    Controllers --> Email
    
    UI --> Analytics
    UI --> CDN

    %% Authentication Flow
    Auth -.->|JWT Tokens| Apollo
    Auth -.->|Passport.js| Controllers

    %% Styling
    classDef client fill:#e1f5fe
    classDef server fill:#f3e5f5
    classDef data fill:#e8f5e8
    classDef external fill:#fff3e0

    class UI,Router,State,Apollo client
    class App,Routes,Resolvers,Auth,Middleware,Controllers,Models,Services server
    class MongoDB,MySQL,FileSystem data
    class Email,Analytics,CDN external
```

## Architecture Overview

### Client Layer (React SPA)
- **React Components**: Material-UI based components for speech therapy exercises
- **React Router**: Client-side routing for different exercise levels
- **Redux Store**: State management for user sessions and exercise data
- **Apollo Client**: GraphQL client for data fetching and caching

### Server Layer (Node.js/Express)
- **Express App**: Main application server with middleware stack
- **REST Routes**: Traditional REST endpoints for user management and CRUD operations
- **GraphQL Resolvers**: GraphQL API for complex word/sentence generation queries
- **Authentication**: JWT-based auth with Passport.js strategies

### Data Layer
- **MongoDB**: Primary database for user data, posts, and exercise history
- **MySQL/Sequelize**: Word database with phonetic data for speech exercises
- **File System**: Static assets and configuration files

### Key Features
- **Speech Therapy Platform**: Specialized for Easy Onset technique training
- **Multi-level Training**: Beginner, Intermediate, and Advanced exercise paths
- **Real-time Progress**: Live exercise tracking and progress indicators
- **Word Generation**: Complex phonetic filtering for therapeutic word selection
- **User Management**: Role-based access with admin and superuser capabilities

### Technology Stack
- **Frontend**: React 18, Material-UI, Apollo Client, Redux
- **Backend**: Node.js, Express, GraphQL, Passport.js
- **Databases**: MongoDB (user data), MySQL (word database)
- **Authentication**: JWT tokens with local and JWT strategies
- **Testing**: Jest, React Testing Library, Supertest