// TypeScript interfaces for modern exercise components

export interface WordDisplayProps {
  currentWord: Word | null;
  displayMode: 'word' | 'sentence' | 'intermission';
  fontSize: 'small' | 'medium' | 'large';
  showPhonetics: boolean;
  highlightTarget: boolean;
  className?: string;
  onWordInteraction?: (interaction: WordInteraction) => void;
}

export interface WordInteraction {
  type: 'click' | 'hover' | 'focus';
  word: Word;
  timestamp: Date;
}

export interface ProgressIndicatorProps {
  wordsCompleted: number;
  totalWords: number;
  accuracy: number;
  timeElapsed: number;
  currentStreak: number;
  bestStreak: number;
  showDetails?: boolean;
  variant?: 'linear' | 'circular' | 'detailed';
  className?: string;
}

export interface ExerciseHistoryProps {
  sessionData: ExerciseSession;
  maxItems?: number;
  showTimestamps?: boolean;
  showAccuracy?: boolean;
  onWordClick?: (word: Word) => void;
  className?: string;
}

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
  currentStreak?: number; // Added missing streak tracking
  bestStreak?: number; // Added missing best streak tracking
}

export interface WordAttempt {
  wordId: string;
  word: Word;
  timestamp: Date;
  accuracy: number;
  timeSpent: number;
  difficulty: number;
  skipped?: boolean; // Added missing skipped flag
  interaction?: string; // Added missing interaction type
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
  difficulty?: number; // Added missing difficulty property (0-1 scale)
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

// Font size mappings for consistent styling
export const FONT_SIZE_MAP = {
  small: {
    word: '2rem',
    sentence: '1.5rem',
    phonetic: '1rem'
  },
  medium: {
    word: '3rem',
    sentence: '2rem',
    phonetic: '1.25rem'
  },
  large: {
    word: '4rem',
    sentence: '2.5rem',
    phonetic: '1.5rem'
  }
} as const;

// Color scheme for exercise components
export const EXERCISE_COLORS = {
  primary: '#1976d2',
  secondary: '#dc004e',
  success: '#2e7d32',
  warning: '#ed6c02',
  error: '#d32f2f',
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#bdbdbd'
  },
  background: {
    default: '#fafafa',
    paper: '#ffffff',
    exercise: '#f5f5f5'
  }
} as const;