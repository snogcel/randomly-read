// Client-side type definitions for the RandomlyRead application

// Shared types (duplicated from server for build compatibility)
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

// Client-specific types
export interface AppState {
  auth: AuthState;
  exercise: ExerciseState;
  routine: RoutineState;
  theme: ThemeState;
  error: ErrorState;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ExerciseState {
  currentWord: Word | null;
  currentRoutine: Routine | null;
  isRunning: boolean;
  isPaused: boolean;
  timeRemaining: number;
  currentStep: number;
  progress: ExerciseProgress;
  history: WordAttempt[];
}

export interface ExerciseProgress {
  wordsCompleted: number;
  totalWords: number;
  accuracy: number;
  timeElapsed: number;
  currentStreak: number;
  bestStreak: number;
}

export interface RoutineState {
  routines: Routine[];
  selectedRoutine: Routine | null;
  isBuilding: boolean;
  buildingRoutine: Partial<Routine>;
  loading: boolean;
  error: string | null;
}

export interface ThemeState {
  currentTheme: 'light' | 'dark' | 'exercise';
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  exerciseMode: boolean;
}

export interface ErrorState {
  message: string | null;
  type: 'error' | 'warning' | 'info' | null;
  timestamp: Date | null;
}

// Component Props Types
export interface TimerProps {
  duration: number;
  isRunning: boolean;
  isPaused: boolean;
  onTick: (timeRemaining: number) => void;
  onComplete: () => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export interface WordDisplayProps {
  word: Word | null;
  displayMode: 'word' | 'sentence' | 'intermission';
  fontSize: 'small' | 'medium' | 'large';
  showPhonetics: boolean;
  highlightTarget: boolean;
  onWordInteraction?: (interaction: WordInteraction) => void;
}

export interface WordInteraction {
  type: 'click' | 'hover' | 'focus';
  word: Word;
  timestamp: Date;
}

export interface RoutineBuilderProps {
  routine: Routine | null;
  isEditing: boolean;
  onSave: (routine: Routine) => Promise<void>;
  onPreview: (routine: Routine) => void;
  onDelete: (routineId: string) => Promise<void>;
}

export interface PhoneticSelectorProps {
  selectedVowels: string[];
  selectedConsonants: string[];
  position: 'initial' | 'medial' | 'final';
  syllableCount: number[];
  gradeLevel: string;
  onVowelChange: (vowels: string[]) => void;
  onConsonantChange: (consonants: string[]) => void;
  onPositionChange: (position: 'initial' | 'medial' | 'final') => void;
  onSyllableChange: (syllables: number[]) => void;
}

// Redux Action Types
export interface Action<T = any> {
  type: string;
  payload?: T;
}

export interface AsyncAction<T = any> extends Action<T> {
  meta?: {
    loading?: boolean;
    error?: boolean;
  };
}

// Form Types
export interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface RoutineFormData {
  name: string;
  description: string;
  age: string;
  steps: SubroutineStepFormData[];
}

export interface SubroutineStepFormData {
  type: 'word' | 'sentence' | 'intermission';
  duration: number;
  repetitions: number;
  vowels: string[];
  consonants: string[];
  position: 'initial' | 'medial' | 'final';
  syllables: number[];
  gradeLevel: string;
  intermissionText?: string;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Event Handler Types
export type ChangeHandler<T = HTMLInputElement> = (
  event: React.ChangeEvent<T>
) => void;

export type ClickHandler<T = HTMLButtonElement> = (
  event: React.MouseEvent<T>
) => void;

export type SubmitHandler<T = HTMLFormElement> = (
  event: React.FormEvent<T>
) => void;