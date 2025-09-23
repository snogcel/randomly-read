// Store type definitions
import { Store } from 'redux';

export interface RootState {
  form: any;
  error: ErrorState;
  auth: AuthState;
  posts: any;
  theme: ThemeState;
  word: WordState;
  modeSelect: any;
  interaction: any;
  exerciseHistory: any;
  routineBuilder: any;
  routineSelect: any;
  administration: any;
  viewHistory: any;
  formData: any;
}

export interface ErrorState {
  message: string | null;
  type: 'error' | 'warning' | 'info' | null;
  timestamp: Date | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ThemeState {
  currentTheme: 'light' | 'dark' | 'exercise';
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  exerciseMode: boolean;
}

export interface WordState {
  currentWord: Word | null;
  words: Word[];
  loading: boolean;
  error: string | null;
}

export interface User {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
  admin?: boolean;
  superuser?: boolean;
}

export interface Word {
  id: string;
  lexeme: string;
  consonant: string;
  vowel: string;
  syllables: number;
  type: string;
  subtype: string;
}

export type AppStore = Store<RootState>;