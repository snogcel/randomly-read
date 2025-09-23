// Core type definitions for the RandomlyRead application

export interface User {
  id: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  routines?: string[];
  interactionSettings?: InteractionSetting[];
  age?: number;
  gender?: string;
  address?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
  admin?: boolean;
  superuser?: boolean;
  company?: string;
  clients?: string[];
  isActive?: boolean;
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  age?: string;
  subroutine: SubroutineStep[];
}

export interface SubroutineStep {
  id: string;
  type: 'word' | 'sentence' | 'intermission';
  duration: number;
  repetitions: number;
  phoneticConfig?: PhoneticConfiguration;
  intermissionText?: string;
}

export interface PhoneticConfiguration {
  vowels: string[];
  consonants: string[];
  position: 'initial' | 'medial' | 'final';
  syllables: number[];
  gradeLevel: string;
}

export interface Word {
  id: string;
  cmudict_id: number;
  wordid: number;
  lexeme: string;
  consonant: string;
  vowel: string;
  type: string;
  subtype: string;
  stress: number;
  syllables: number;
  wordsXsensesXsynsets: Definition[];
  score: number;
  votes: Vote[];
}

export interface Definition {
  synsetid: number;
  wordid: number;
  lemma: string;
  casedwordid: number;
  senseid: number;
  sensenum: number;
  lexid: number;
  tagcount: number;
  sensekey: string;
  pos: string;
  lexdomainid: number;
  definition: string;
}

export interface Vote {
  user: string;
  vote: number;
}

export interface Sentence {
  words: Word[];
}

export interface InteractionSetting {
  id: string;
  type: string;
  value: any;
}

// GraphQL Query Types
export interface WordQueryArgs {
  vowel?: string[];
  consonant?: string[];
  type?: string[];
  subtype?: string[];
  syllables?: number[];
  position?: string;
  age?: string;
  limit?: number;
}

export interface SentenceQueryArgs {
  templates?: string[];
  vowel?: string[];
  consonant?: string[];
  syllables?: number[];
  position?: string;
  age?: string;
  limit?: number;
}

// Exercise Types
export interface ExerciseSession {
  id: string;
  userId: string;
  routineId: string;
  startTime: Date;
  endTime?: Date;
  wordsAttempted: WordAttempt[];
  accuracy: number;
  completionRate: number;
  difficultWords: Word[];
}

export interface WordAttempt {
  wordId: string;
  word: Word;
  timestamp: Date;
  accuracy: number;
  timeSpent: number;
  difficulty: number;
}

export interface ProgressRecord {
  id: string;
  userId: string;
  routineId: string;
  sessionId: string;
  wordId: string;
  timestamp: Date;
  accuracy: number;
  timeSpent: number;
  difficulty: number;
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  message?: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  requestId: string;
}

// Authentication Types
export interface AuthPayload {
  token: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}