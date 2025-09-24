import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # Scalar types
  scalar Date

  # Word types
  type Definition {
    synsetid: Int!
    wordid: Int!
    lemma: String!
    casedwordid: Int!
    senseid: Int!
    sensenum: Int!
    lexid: Int!
    tagcount: Int!
    sensekey: String!
    pos: String!
    lexdomainid: Int!
    definition: String!
  }

  type Vote {
    user: ID!
    vote: Int!
  }

  type Word {
    id: ID!
    cmudict_id: Int!
    wordid: Int!
    lexeme: String!
    consonant: String!
    vowel: String!
    type: String!
    subtype: String
    stress: Int!
    syllables: Int!
    position: String!
    age_of_acquisition: Int
    wordsXsensesXsynsets: [Definition!]!
    score: Int!
    votes: [Vote!]!
    views: Int!
    upvotePercentage: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type WordFilterResult {
    words: [Word!]!
    totalCount: Int!
    hasMore: Boolean!
  }

  # Sentence types
  type SentenceWord {
    id: ID
    lexeme: String!
    votes: [Vote!]
    score: Int
  }

  type Sentence {
    words: [SentenceWord!]!
  }

  # Routine types
  type PhoneticConfiguration {
    vowels: [String!]!
    consonants: [String!]!
    position: String!
    syllables: [Int!]!
    gradeLevel: String!
  }

  type SubroutineStep {
    id: ID!
    type: String!
    duration: Int!
    repetitions: Int!
    phoneticConfig: PhoneticConfiguration
    intermissionText: String
  }

  type Routine {
    id: ID!
    name: String!
    description: String
    gradeLevel: String
    subroutine: [SubroutineStep!]!
    createdBy: User!
    assignedUsers: [User!]!
    isActive: Boolean!
    totalDuration: Int!
    stepCount: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type RoutineQueryResult {
    routines: [Routine!]!
    totalCount: Int!
    hasMore: Boolean!
  }

  # User types
  type User {
    id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String
    routines: [Routine!]
    age: Int
    gender: String
    admin: Boolean
    superuser: Boolean
    company: String
    clients: [User!]
    isActive: Boolean
    createdAt: Date!
    updatedAt: Date!
  }

  # Progress types
  type WordAttempt {
    wordId: ID!
    word: String!
    timestamp: Date!
    accuracy: Int!
    timeSpent: Int!
    difficulty: Int!
    position: String!
    consonant: String!
    vowel: String!
  }

  type ExerciseSession {
    id: ID!
    userId: ID!
    routineId: ID!
    sessionId: String!
    startTime: Date!
    endTime: Date
    wordsAttempted: [WordAttempt!]!
    totalWords: Int!
    completedWords: Int!
    accuracy: Int!
    completionRate: Int!
    difficultWords: [Word!]!
    notes: String
    duration: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type ProgressRecord {
    id: ID!
    userId: ID!
    routineId: ID!
    sessionId: ID!
    wordId: ID!
    timestamp: Date!
    accuracy: Int!
    timeSpent: Int!
    difficulty: Int!
    position: String!
    consonant: String!
    vowel: String!
    syllables: Int!
    createdAt: Date!
  }

  type PhoneticStats {
    consonant: String!
    vowel: String!
    position: String!
    accuracy: Int!
    frequency: Int!
  }

  type FluencyReport {
    id: ID!
    userId: ID!
    routineId: ID!
    reportDate: Date!
    dateRange: DateRange!
    totalSessions: Int!
    totalWords: Int!
    averageAccuracy: Int!
    averageSessionDuration: Int!
    improvementTrend: String!
    difficultPhonemes: [PhoneticStats!]!
    recommendations: [String!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type DateRange {
    start: Date!
    end: Date!
  }

  # Input types
  input WordQueryInput {
    vowel: [String!]
    consonant: [String!]
    type: [String!]
    subtype: [String!]
    syllables: [Int!]
    position: String
    age: String
    limit: Int
    gradeLevel: String
  }

  input SentenceQueryInput {
    templates: [String!]
    vowel: [String!]
    consonant: [String!]
    syllables: [Int!]
    position: String
    age: String
    limit: Int
  }

  input PhoneticConfigurationInput {
    vowels: [String!]!
    consonants: [String!]!
    position: String!
    syllables: [Int!]!
    gradeLevel: String!
  }

  input SubroutineStepInput {
    id: ID
    type: String!
    duration: Int!
    repetitions: Int!
    phoneticConfig: PhoneticConfigurationInput
    intermissionText: String
  }

  input CreateRoutineInput {
    name: String!
    description: String
    gradeLevel: String
    subroutine: [SubroutineStepInput!]!
    assignedUsers: [ID!]
  }

  input UpdateRoutineInput {
    name: String
    description: String
    gradeLevel: String
    subroutine: [SubroutineStepInput!]
    assignedUsers: [ID!]
    isActive: Boolean
  }

  input RoutineQueryInput {
    createdBy: ID
    assignedTo: ID
    isActive: Boolean
    gradeLevel: String
    limit: Int
    offset: Int
    sortBy: String
    sortOrder: String
  }

  input WordAttemptInput {
    wordId: ID!
    word: String!
    accuracy: Int!
    timeSpent: Int!
    difficulty: Int!
    position: String!
    consonant: String!
    vowel: String!
  }

  input CreateExerciseSessionInput {
    routineId: ID!
    sessionId: String!
    totalWords: Int!
    notes: String
  }

  input UpdateExerciseSessionInput {
    endTime: Date
    wordsAttempted: [WordAttemptInput!]
    totalWords: Int
    notes: String
  }

  # Queries
  type Query {
    # Word queries
    words(input: WordQueryInput!): WordFilterResult!
    word(id: ID!): Word
    randomWord(input: WordQueryInput!): Word
    
    # Sentence queries
    sentences(input: SentenceQueryInput!): Sentence!
    
    # Routine queries
    routines(input: RoutineQueryInput): RoutineQueryResult!
    routine(id: ID!): Routine
    userRoutines(userId: ID): [Routine!]!
    
    # Progress queries
    exerciseSessions(userId: ID!, routineId: ID, limit: Int, offset: Int): [ExerciseSession!]!
    exerciseSession(id: ID!): ExerciseSession
    progressRecords(userId: ID!, routineId: ID, startDate: Date, endDate: Date): [ProgressRecord!]!
    fluencyReport(userId: ID!, routineId: ID!, startDate: Date!, endDate: Date!): FluencyReport!
    
    # User queries
    me: User
    users(limit: Int, offset: Int): [User!]!
    user(id: ID!): User
  }

  # Mutations
  type Mutation {
    # Word mutations
    voteWord(wordId: ID!, vote: Int!): Word!
    
    # Routine mutations
    createRoutine(input: CreateRoutineInput!): Routine!
    updateRoutine(id: ID!, input: UpdateRoutineInput!): Routine!
    deleteRoutine(id: ID!): Boolean!
    assignRoutine(routineId: ID!, userIds: [ID!]!): Boolean!
    unassignRoutine(routineId: ID!, userIds: [ID!]!): Boolean!
    
    # Progress mutations
    createExerciseSession(input: CreateExerciseSessionInput!): ExerciseSession!
    updateExerciseSession(id: ID!, input: UpdateExerciseSessionInput!): ExerciseSession!
    addWordAttempt(sessionId: ID!, attempt: WordAttemptInput!): ExerciseSession!
    completeExerciseSession(id: ID!): ExerciseSession!
    
    # User mutations
    updateProfile(firstName: String, lastName: String, email: String): User!
  }

  # Subscriptions (for real-time updates)
  type Subscription {
    exerciseSessionUpdated(sessionId: ID!): ExerciseSession!
    routineAssigned(userId: ID!): Routine!
  }
`;