// TypeScript interfaces for RoutineBuilder components

export interface VowelSound {
  id: string;
  name: string;
}

export interface ConsonantSound {
  id: string;
  name: string;
}

export interface SyllableOption {
  id: number;
  name: string;
}

export interface ModeOption {
  id: string;
  name: string;
}

export interface PositionOption {
  id: string;
  name: string;
}

export interface GradeLevelOption {
  id: string;
  name: string;
}

export interface User {
  id: number;
  name: string;
  isActive: boolean;
}

export interface Routine {
  id: number;
  name: string;
}

export interface ExerciseStep {
  index: number;
  rangeVal: number;
  repetitions: number;
  mode: string;
  isIntermission: boolean;
  vowels?: string[];
  consonants?: string[];
  syllables?: number[];
  position?: string;
  intermissionText?: string;
}

export interface RoutineMetadata {
  id: number;
  name: string;
  description: any;
  age: string;
}

export interface PhoneticConfiguration {
  vowels: string[];
  consonants: string[];
  position: string;
  syllables: number[];
  gradeLevel: string;
}

export interface RoutineBuilderProps {
  // User and routine selection
  availableUsers: any[];
  userId: number;
  availableRoutines: any[];
  user: any;
  
  // Current routine metadata
  id: number;
  name: string;
  description: any;
  age: string;
  
  // Exercise step configuration
  routine: ExerciseStep[];
  index: number;
  vowels: string[];
  consonants: string[];
  mode: string;
  rangeVal: number;
  repetitions: number;
  syllables: number[];
  position: string;
  intermissionText: string;
  isIntermission: boolean;
  
  // State management
  lastUpdated: any;
  isFetching: boolean;
  isFetchingRoutines: boolean;
  
  // Actions
  resetRoutineBuilder: () => void;
  fetchUsers: () => void;
  fetchRoutines: (userId: number) => void;
  attemptCreateRoutine: (userId: number, routineName: string) => void;
  attemptDeleteRoutine: (userId: number, routineId: number) => void;
  attemptUpdateRoutine: (id: number, body: any) => void;
  
  // Form actions
  updateUserId: (id: number) => void;
  updateId: (id: number) => void;
  updateName: (name: string) => void;
  updateDescription: (description: any) => void;
  updateGradeLevel: (age: string) => void;
  
  // Step management actions
  insertStep: (step: ExerciseStep) => void;
  removeStep: (index: number) => void;
  updateStep: (routine: ExerciseStep[]) => void;
  resetStepList: () => void;
  resetForm: () => void;
  updateIndex: (index: number) => void;
  
  // Phonetic configuration actions
  updateVowels: (vowels: string[]) => void;
  updateConsonants: (consonants: string[]) => void;
  addConsonant: (consonant: string) => void;
  removeConsonant: (consonant: string) => void;
  updateMode: (mode: string) => void;
  updatePosition: (position: string) => void;
  updateSyllables: (syllables: number[]) => void;
  updateRangeVal: (rangeVal: number) => void;
  updateRepetitions: (repetitions: number) => void;
  updateIntermissionText: (text: string) => void;
  updateIsIntermission: (isIntermission: boolean) => void;
  
  // Other actions
  resetWordCard: () => void;
  resetRoutineSelect: () => void;
}

export interface RoutineMetadataProps {
  name: string;
  description: any;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: any) => void;
  showDescriptionEditor: boolean;
  onToggleDescriptionEditor: () => void;
}

export interface ExerciseStepListProps {
  routine: ExerciseStep[];
  currentIndex: number;
  onStepSelect: (index: number) => void;
}

export interface StepEditorProps {
  // Current step configuration
  mode: string;
  rangeVal: number;
  repetitions: number;
  vowels: string[];
  consonants: string[];
  syllables: number[];
  position: string;
  intermissionText: string;
  isIntermission: boolean;
  
  // Available options
  availableVowels: VowelSound[];
  availableConsonants: ConsonantSound[];
  availableSyllables: SyllableOption[];
  availableModes: ModeOption[];
  availablePositions: PositionOption[];
  availableGradeLevels: GradeLevelOption[];
  
  // Event handlers
  onModeChange: (mode: string) => void;
  onRangeValChange: (rangeVal: number) => void;
  onRepetitionsChange: (repetitions: number) => void;
  onVowelChange: (vowels: string[]) => void;
  onConsonantChange: (consonant: string, value: boolean) => void;
  onSyllableChange: (syllables: string[]) => void;
  onPositionChange: (position: string) => void;
  onIntermissionTextChange: (text: string) => void;
  
  // Step management
  onInsertStep: () => void;
  onUpdateStep: () => void;
  onDeleteStep: () => void;
  onResetForm: () => void;
}

export interface RoutinePreviewProps {
  routineStep: ExerciseStep;
  classes: any;
}