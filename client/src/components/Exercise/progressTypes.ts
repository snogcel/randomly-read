// TypeScript interfaces for progress tracking components

export interface FluencyReportProps {
  userId: string;
  dateRange: DateRange;
  routineFilter?: string[];
  data: FluencyData | null;
  onGenerateReport?: (config: ReportConfig) => Promise<void>;
  onExportReport?: (config: ExportConfig) => void;
  showCharts?: boolean;
  showTrends?: boolean;
  className?: string;
}

export interface WordHistoryProps {
  userId: string;
  words: WordHistoryEntry[];
  onWordClick?: (word: WordHistoryEntry) => void;
  onFilterChange?: (filters: WordHistoryFilters) => void;
  maxItems?: number;
  showFilters?: boolean;
  showStats?: boolean;
  className?: string;
}

export interface SessionSummaryProps {
  session: ExerciseSessionSummary;
  onRetrySession?: () => void;
  onContinueToNext?: () => void;
  onViewDetails?: () => void;
  showActions?: boolean;
  showRecommendations?: boolean;
  className?: string;
}

// Data types
export interface FluencyData {
  userId: string;
  dateRange: DateRange;
  sessions: SessionData[];
  overallStats: OverallStats;
  difficultyBreakdown: DifficultyBreakdown[];
  phoneticProgress: PhoneticProgress[];
  recommendations: Recommendation[];
}

export interface SessionData {
  id: string;
  date: Date;
  routineId: string;
  routineName: string;
  duration: number; // in seconds
  wordsAttempted: number;
  wordsCompleted: number;
  accuracy: number; // 0-1
  wordsPerMinute?: number;
  consistencyScore?: number;
  difficultWords: string[];
  achievements: Achievement[];
}

export interface OverallStats {
  totalSessions: number;
  totalWordsAttempted: number;
  totalTimeSpent: number; // in seconds
  averageAccuracy: number;
  bestAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  improvementRate: number; // percentage
}

export interface DifficultyBreakdown {
  level: 'easy' | 'medium' | 'hard';
  count: number;
  percentage: number;
  averageAccuracy: number;
}

export interface PhoneticProgress {
  phoneme: string;
  category: 'vowel' | 'consonant';
  position: 'initial' | 'medial' | 'final';
  attemptsCount: number;
  accuracy: number;
  improvement: number; // percentage change
  lastPracticed: Date;
}

export interface WordHistoryEntry {
  id: string;
  word: string;
  phonetic: string;
  attempts: WordAttemptHistory[];
  firstAttempt: Date;
  lastAttempt: Date;
  totalAttempts: number;
  successfulAttempts: number;
  averageAccuracy: number;
  averageTime: number;
  difficulty: number;
  category: string;
  tags: string[];
}

export interface WordAttemptHistory {
  id: string;
  timestamp: Date;
  accuracy: number;
  timeSpent: number;
  sessionId: string;
  routineId: string;
  context: 'word' | 'sentence';
  skipped: boolean;
}

export interface ExerciseSessionSummary {
  id: string;
  userId: string;
  routineId: string;
  routineName: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  totalWords: number;
  completedWords: number;
  skippedWords: number;
  accuracy: number;
  wordsPerMinute: number;
  difficultWords: WordDifficulty[];
  achievements: Achievement[];
  recommendations: Recommendation[];
  nextRecommendedRoutine?: string;
}

export interface WordDifficulty {
  word: string;
  attempts: number;
  accuracy: number;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard';
  reason: string;
}

export interface Achievement {
  id: string;
  type: 'accuracy' | 'speed' | 'consistency' | 'streak' | 'milestone';
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  points?: number;
}

export interface Recommendation {
  id: string;
  type: 'routine' | 'phoneme' | 'difficulty' | 'practice';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionText: string;
  actionData?: any;
}

// Filter and configuration types
export interface DateRange {
  start: Date;
  end: Date;
}

export interface WordHistoryFilters {
  searchTerm?: string;
  difficulty?: ('easy' | 'medium' | 'hard')[];
  category?: string[];
  dateRange?: DateRange;
  minAttempts?: number;
  accuracyRange?: {
    min: number;
    max: number;
  };
}

export interface ReportConfig {
  userId: string;
  dateRange: DateRange;
  routineFilter?: string[];
  includeCharts: boolean;
  includeTrends: boolean;
  includeRecommendations: boolean;
}

export interface ExportConfig {
  userId: string;
  dateRange: DateRange;
  metrics: any;
  chartData: any[];
  format: 'pdf' | 'csv' | 'json';
}

// Progress analysis types
export interface ProgressTrend {
  direction: 'up' | 'down' | 'stable';
  percentage: number;
  description: string;
}

export interface PerformanceMetrics {
  accuracy: {
    current: number;
    previous: number;
    trend: ProgressTrend;
  };
  speed: {
    current: number;
    previous: number;
    trend: ProgressTrend;
  };
  consistency: {
    current: number;
    previous: number;
    trend: ProgressTrend;
  };
}

// Chart data types
export interface ChartDataPoint {
  date: string;
  accuracy: number;
  speed: number;
  consistency: number;
  session: number;
}

export interface DifficultyChartData {
  name: string;
  value: number;
  count: number;
  color: string;
}

// Session comparison types
export interface SessionComparison {
  current: ExerciseSessionSummary;
  previous?: ExerciseSessionSummary;
  improvements: string[];
  regressions: string[];
  recommendations: Recommendation[];
}

// Goal tracking types
export interface Goal {
  id: string;
  type: 'accuracy' | 'speed' | 'consistency' | 'streak';
  target: number;
  current: number;
  deadline?: Date;
  description: string;
  achieved: boolean;
  achievedAt?: Date;
}

export interface GoalProgress {
  goal: Goal;
  progress: number; // 0-100 percentage
  trend: ProgressTrend;
  estimatedCompletion?: Date;
}

// Statistics types
export interface StatisticalSummary {
  mean: number;
  median: number;
  mode: number;
  standardDeviation: number;
  min: number;
  max: number;
  quartiles: {
    q1: number;
    q2: number;
    q3: number;
  };
}

export interface PerformanceDistribution {
  accuracy: StatisticalSummary;
  speed: StatisticalSummary;
  sessionDuration: StatisticalSummary;
}

// Notification types for progress updates
export interface ProgressNotification {
  id: string;
  type: 'achievement' | 'milestone' | 'recommendation' | 'reminder';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  data?: any;
}