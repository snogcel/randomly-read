# Design Document

## Overview

This design document outlines the comprehensive refactoring approach for the RandomlyRead speech therapy application. The refactoring will modernize the technology stack, simplify the complex component architecture, optimize performance for real-time exercise timing, and improve maintainability while preserving the sophisticated exercise functionality that makes this application valuable for speech therapy professionals.

The current application features a complex but powerful architecture with timer-based exercises, routine building capabilities, progress tracking, and a 155,000+ word database with phonetic filtering. The refactoring will maintain these core capabilities while addressing technical debt and performance issues.

## Architecture

### High-Level Architecture

The refactored application will follow a modern, layered architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Application                       │
├─────────────────────────────────────────────────────────────┤
│  Exercise Components  │  Routine Builder  │  Progress UI    │
│  - Timer System       │  - Step Editor    │  - Reports      │
│  - Word Display       │  - Phonetic Config│  - History      │
│  - Progress Tracker   │  - Preview        │  - Analytics    │
├─────────────────────────────────────────────────────────────┤
│              State Management Layer                         │
│  - Exercise Context   │  - Routine Context │ - User Context │
│  - Timer State        │  - Builder State   │ - Progress Data │
├─────────────────────────────────────────────────────────────┤
│                   API Gateway Layer                         │
│  - GraphQL Client     │  - REST Endpoints  │ - Auth Layer   │
│  - Word Queries       │  - User Management │ - Caching      │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Server Application                       │
├─────────────────────────────────────────────────────────────┤
│              GraphQL & REST API Layer                      │
│  - Word Resolvers     │  - User Routes     │ - Auth Routes  │
│  - Phonetic Queries   │  - Routine CRUD    │ - Progress API │
├─────────────────────────────────────────────────────────────┤
│                  Business Logic Layer                       │
│  - Exercise Service   │  - Routine Service │ - User Service │
│  - Word Filtering     │  - Progress Calc   │ - Auth Service │
│  - Phonetic Logic     │  - Report Gen      │ - Validation   │
├─────────────────────────────────────────────────────────────┤
│                   Data Access Layer                         │
│  - Word Repository    │  - User Repository │ - Cache Layer  │
│  - Routine Repository │  - Progress Repo   │ - Query Opt    │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                      Database Layer                         │
│  - Word Database      │  - User Data       │ - Session Data │
│  - Phonetic Indexes   │  - Routine Storage │ - Progress Log │
│  - 155k+ Words        │  - Relationships   │ - Analytics    │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack Modernization

**Frontend Stack:**
- **React 18.x** with Concurrent Features for smooth exercise timing
- **TypeScript** for type safety across complex exercise configurations
- **MUI v5** with custom theming for exercise interfaces
- **Apollo Client 3.x** with optimized caching for word queries
- **React Router v6** for multi-level exercise navigation
- **React Hook Form** for routine builder forms
- **Framer Motion** for smooth exercise transitions

**Backend Stack:**
- **Node.js 18+** with ES modules
- **Apollo Server 4.x** for GraphQL word queries
- **Express.js** for REST endpoints
- **MongoDB** with optimized indexes for phonetic searches
- **Mongoose 7.x** with TypeScript integration
- **JWT** with secure token management
- **Redis** for session and query caching

## Components and Interfaces

### Core Exercise System

#### ExerciseEngine Component
```typescript
interface ExerciseEngine {
  // Core exercise execution
  startExercise(routine: Routine): Promise<void>
  pauseExercise(): void
  resumeExercise(): void
  skipToNext(): void
  resetExercise(): void
  
  // Timer management
  getCurrentTime(): number
  getTimeRemaining(): number
  setExerciseDuration(seconds: number): void
  
  // Progress tracking
  markWordCompleted(word: Word, accuracy?: number): void
  getCurrentProgress(): ExerciseProgress
  
  // Event handlers
  onWordChange: (word: Word) => void
  onExerciseComplete: (results: ExerciseResults) => void
  onTimerTick: (timeRemaining: number) => void
}
```

#### WordDisplay Component
```typescript
interface WordDisplayProps {
  currentWord: Word | null
  displayMode: 'word' | 'sentence' | 'intermission'
  fontSize: 'small' | 'medium' | 'large'
  showPhonetics: boolean
  highlightTarget: boolean
  onWordInteraction?: (interaction: WordInteraction) => void
}
```

#### TimerControls Component
```typescript
interface TimerControlsProps {
  isRunning: boolean
  isPaused: boolean
  canStart: boolean
  autoAdvance: boolean
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onSkip: () => void
  onReset: () => void
  onAutoToggle: (enabled: boolean) => void
}
```

### Routine Building System

#### RoutineBuilder Component (Refactored)
```typescript
interface RoutineBuilderProps {
  routine: Routine | null
  isEditing: boolean
  onSave: (routine: Routine) => Promise<void>
  onPreview: (routine: Routine) => void
  onDelete: (routineId: string) => Promise<void>
}

// Broken down into smaller components:
// - RoutineMetadata (name, description, grade level)
// - ExerciseStepList (list of exercise steps)
// - StepEditor (individual step configuration)
// - PhoneticSelector (vowel/consonant selection)
// - RoutinePreview (preview exercise flow)
```

#### PhoneticConfiguration Component
```typescript
interface PhoneticConfigProps {
  selectedVowels: VowelSound[]
  selectedConsonants: ConsonantSound[]
  position: 'initial' | 'medial' | 'final'
  syllableCount: number[]
  gradeLevel: string
  onVowelChange: (vowels: VowelSound[]) => void
  onConsonantChange: (consonants: ConsonantSound[]) => void
  onPositionChange: (position: string) => void
  onSyllableChange: (syllables: number[]) => void
  availableOptions: PhoneticOptions // Filtered based on blacklists
}
```

### Progress Tracking System

#### ProgressTracker Component
```typescript
interface ProgressTrackerProps {
  userId: string
  routineId: string
  sessionData: ExerciseSession
  onProgressUpdate: (progress: ProgressUpdate) => void
}

interface ExerciseSession {
  startTime: Date
  endTime?: Date
  wordsAttempted: WordAttempt[]
  accuracy: number
  completionRate: number
  difficultWords: Word[]
}
```

#### FluencyReports Component
```typescript
interface FluencyReportsProps {
  userId: string
  dateRange: DateRange
  routineFilter?: string[]
  onGenerateReport: (config: ReportConfig) => Promise<Report>
}
```

### Data Models

#### Core Exercise Models
```typescript
interface Routine {
  id: string
  name: string
  description: string
  gradeLevel: string
  steps: ExerciseStep[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

interface ExerciseStep {
  id: string
  type: 'word' | 'sentence' | 'intermission'
  duration: number // seconds
  repetitions: number
  phoneticConfig: PhoneticConfiguration
  intermissionText?: string
}

interface PhoneticConfiguration {
  vowels: VowelSound[]
  consonants: ConsonantSound[]
  position: 'initial' | 'medial' | 'final'
  syllables: number[]
  gradeLevel: string
}

interface Word {
  id: string
  lexeme: string
  phonetic: string
  consonants: string[]
  vowels: string[]
  syllables: number
  gradeLevel: string
  definitions: Definition[]
  difficulty: number
}
```

#### User and Progress Models
```typescript
interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  role: 'therapist' | 'client' | 'admin'
  assignedRoutines: string[]
  clients?: string[] // for therapists
  therapist?: string // for clients
  preferences: UserPreferences
}

interface ProgressRecord {
  id: string
  userId: string
  routineId: string
  sessionId: string
  wordId: string
  timestamp: Date
  accuracy: number
  timeSpent: number
  difficulty: number
}
```

## Error Handling

### Client-Side Error Handling

#### Exercise Error Boundaries
```typescript
class ExerciseErrorBoundary extends React.Component {
  // Handles errors during exercise execution
  // Provides fallback UI to continue or restart exercise
  // Logs errors for debugging without disrupting user flow
}

class RoutineBuilderErrorBoundary extends React.Component {
  // Handles errors during routine building
  // Preserves user's work in progress
  // Provides recovery options
}
```

#### GraphQL Error Handling
```typescript
interface WordQueryError {
  type: 'NETWORK_ERROR' | 'GRAPHQL_ERROR' | 'TIMEOUT_ERROR'
  message: string
  retryable: boolean
  fallbackData?: Word[]
}

// Error handling strategy:
// 1. Network errors: Retry with exponential backoff
// 2. GraphQL errors: Show user-friendly message, provide fallback
// 3. Timeout errors: Use cached data if available
```

### Server-Side Error Handling

#### Structured Error Responses
```typescript
interface APIError {
  code: string
  message: string
  details?: any
  timestamp: Date
  requestId: string
}

// Error categories:
// - WORD_QUERY_FAILED: Issues with word database queries
// - ROUTINE_VALIDATION_ERROR: Invalid routine configurations
// - PHONETIC_FILTER_ERROR: Problems with consonant/vowel filtering
// - PROGRESS_TRACKING_ERROR: Issues saving exercise progress
```

#### Database Error Handling
```typescript
// MongoDB connection resilience
// Query timeout handling
// Index optimization for phonetic searches
// Graceful degradation when word database is unavailable
```

## Testing Strategy

### Unit Testing

#### Exercise Logic Testing
```typescript
// Test timer accuracy and precision
// Test routine execution flow
// Test phonetic filtering algorithms
// Test progress calculation logic
// Test word query optimization
```

#### Component Testing
```typescript
// Test exercise components with React Testing Library
// Test routine builder form validation
// Test phonetic selector interactions
// Test progress display accuracy
// Test accessibility compliance
```

### Integration Testing

#### Exercise Flow Testing
```typescript
// Test complete exercise sessions
// Test routine building and execution
// Test progress tracking accuracy
// Test multi-user scenarios (therapist/client)
// Test GraphQL query performance
```

#### Database Integration Testing
```typescript
// Test word database queries with various phonetic filters
// Test routine storage and retrieval
// Test progress data aggregation
// Test user relationship management
```

### Performance Testing

#### Exercise Timing Accuracy
```typescript
// Test timer precision under load
// Test word transition smoothness
// Test memory usage during long sessions
// Test GraphQL query response times
// Test concurrent user scenarios
```

#### Load Testing
```typescript
// Test word database query performance
// Test routine builder with complex configurations
// Test progress tracking with large datasets
// Test concurrent exercise sessions
```

### End-to-End Testing

#### User Journey Testing
```typescript
// Test complete therapist workflow (create routine, assign to client)
// Test complete client workflow (execute routine, track progress)
// Test exercise session from start to completion
// Test routine building with complex phonetic configurations
// Test progress reporting and analytics
```

## Performance Optimizations

### Exercise Timing Optimizations

#### High-Precision Timer System
```typescript
// Use requestAnimationFrame for smooth timer updates
// Implement Web Workers for background timing calculations
// Optimize React rendering to prevent timer disruptions
// Cache word data to eliminate query delays during exercises
```

#### Word Query Optimization
```typescript
// Implement intelligent prefetching of next words
// Use Apollo Client cache for frequently accessed words
// Optimize GraphQL queries with proper field selection
// Implement query batching for routine preview
```

### Database Optimizations

#### Phonetic Search Indexes
```typescript
// Compound indexes for vowel + consonant + position queries
// Text indexes for lexeme searches
// Optimized indexes for syllable and grade level filtering
// Partial indexes for frequently accessed word subsets
```

#### Query Optimization
```typescript
// Aggregation pipelines for complex phonetic filtering
// Efficient blacklist filtering algorithms
// Cached query results for common phonetic combinations
// Optimized routine storage with embedded exercise steps
```

### Client-Side Performance

#### Code Splitting and Lazy Loading
```typescript
// Lazy load exercise modules by training level
// Code split routine builder from exercise execution
// Lazy load progress reporting components
// Optimize bundle size by removing unused dependencies
```

#### Memory Management
```typescript
// Efficient cleanup of exercise timers
// Proper disposal of audio resources
// Optimized word data structures
// Memory-efficient progress tracking
```

This design provides a comprehensive foundation for refactoring the RandomlyRead application while maintaining its sophisticated exercise capabilities and improving performance, maintainability, and user experience.