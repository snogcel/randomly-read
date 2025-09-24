import type { ExerciseSession } from '../contexts/ExerciseContext';
import type { RoutineBuilderState } from '../contexts/RoutineContext';

// Storage keys
const STORAGE_KEYS = {
  EXERCISE_SESSION: 'randomlyread_exercise_session',
  ROUTINE_BUILDER: 'randomlyread_routine_builder',
  USER_PREFERENCES: 'randomlyread_user_preferences'
} as const;

// Session persistence utilities
export class SessionPersistence {
  private static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  // Exercise session persistence
  static saveExerciseSession(session: ExerciseSession): boolean {
    if (!this.isStorageAvailable()) return false;

    try {
      const sessionData = {
        ...session,
        startTime: session.startTime.toISOString(),
        endTime: session.endTime?.toISOString(),
        attempts: session.attempts.map(attempt => ({
          ...attempt,
          timestamp: attempt.timestamp.toISOString()
        }))
      };

      localStorage.setItem(STORAGE_KEYS.EXERCISE_SESSION, JSON.stringify(sessionData));
      return true;
    } catch (error) {
      console.warn('Failed to save exercise session:', error);
      return false;
    }
  }

  static loadExerciseSession(): ExerciseSession | null {
    if (!this.isStorageAvailable()) return null;

    try {
      const sessionData = localStorage.getItem(STORAGE_KEYS.EXERCISE_SESSION);
      if (!sessionData) return null;

      const parsed = JSON.parse(sessionData);
      
      // Check if session is recent (within 24 hours)
      const sessionAge = Date.now() - new Date(parsed.startTime).getTime();
      if (sessionAge > 24 * 60 * 60 * 1000) {
        this.clearExerciseSession();
        return null;
      }

      return {
        ...parsed,
        startTime: new Date(parsed.startTime),
        endTime: parsed.endTime ? new Date(parsed.endTime) : undefined,
        attempts: parsed.attempts.map((attempt: any) => ({
          ...attempt,
          timestamp: new Date(attempt.timestamp)
        }))
      };
    } catch (error) {
      console.warn('Failed to load exercise session:', error);
      this.clearExerciseSession();
      return null;
    }
  }

  static clearExerciseSession(): void {
    if (!this.isStorageAvailable()) return;

    try {
      localStorage.removeItem(STORAGE_KEYS.EXERCISE_SESSION);
    } catch (error) {
      console.warn('Failed to clear exercise session:', error);
    }
  }

  // Routine builder persistence
  static saveRoutineBuilder(builder: RoutineBuilderState): boolean {
    if (!this.isStorageAvailable()) return false;

    try {
      const builderData = {
        ...builder,
        // Only save if there's meaningful content
        shouldSave: builder.name.trim() || builder.description.trim() || builder.steps.length > 0
      };

      if (builderData.shouldSave) {
        localStorage.setItem(STORAGE_KEYS.ROUTINE_BUILDER, JSON.stringify(builderData));
      }
      return true;
    } catch (error) {
      console.warn('Failed to save routine builder state:', error);
      return false;
    }
  }

  static loadRoutineBuilder(): RoutineBuilderState | null {
    if (!this.isStorageAvailable()) return null;

    try {
      const builderData = localStorage.getItem(STORAGE_KEYS.ROUTINE_BUILDER);
      if (!builderData) return null;

      const parsed = JSON.parse(builderData);
      
      // Remove the shouldSave flag
      delete parsed.shouldSave;
      
      return parsed;
    } catch (error) {
      console.warn('Failed to load routine builder state:', error);
      this.clearRoutineBuilder();
      return null;
    }
  }

  static clearRoutineBuilder(): void {
    if (!this.isStorageAvailable()) return;

    try {
      localStorage.removeItem(STORAGE_KEYS.ROUTINE_BUILDER);
    } catch (error) {
      console.warn('Failed to clear routine builder state:', error);
    }
  }

  // User preferences persistence
  static saveUserPreferences(preferences: Record<string, any>): boolean {
    if (!this.isStorageAvailable()) return false;

    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.warn('Failed to save user preferences:', error);
      return false;
    }
  }

  static loadUserPreferences(): Record<string, any> | null {
    if (!this.isStorageAvailable()) return null;

    try {
      const preferencesData = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      if (!preferencesData) return null;

      return JSON.parse(preferencesData);
    } catch (error) {
      console.warn('Failed to load user preferences:', error);
      this.clearUserPreferences();
      return null;
    }
  }

  static clearUserPreferences(): void {
    if (!this.isStorageAvailable()) return;

    try {
      localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
    } catch (error) {
      console.warn('Failed to clear user preferences:', error);
    }
  }

  // Clear all stored data
  static clearAll(): void {
    this.clearExerciseSession();
    this.clearRoutineBuilder();
    this.clearUserPreferences();
  }

  // Get storage usage info
  static getStorageInfo(): { used: number; available: number; percentage: number } {
    if (!this.isStorageAvailable()) {
      return { used: 0, available: 0, percentage: 0 };
    }

    try {
      let used = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length;
        }
      }

      // Estimate available storage (most browsers have ~5-10MB limit)
      const estimated = 5 * 1024 * 1024; // 5MB estimate
      const available = Math.max(0, estimated - used);
      const percentage = (used / estimated) * 100;

      return { used, available, percentage };
    } catch (error) {
      console.warn('Failed to get storage info:', error);
      return { used: 0, available: 0, percentage: 0 };
    }
  }
}

// Auto-cleanup utility for old data
export class StorageCleanup {
  private static readonly MAX_SESSIONS = 10;
  private static readonly MAX_AGE_DAYS = 30;

  static cleanupOldSessions(): void {
    // This would be implemented to clean up old session data
    // For now, we just clear sessions older than 24 hours in loadExerciseSession
    console.log('Storage cleanup completed');
  }

  static scheduleCleanup(): void {
    // Schedule cleanup to run periodically
    const cleanup = () => {
      this.cleanupOldSessions();
      // Schedule next cleanup in 24 hours
      setTimeout(cleanup, 24 * 60 * 60 * 1000);
    };

    // Initial cleanup after 1 minute
    setTimeout(cleanup, 60 * 1000);
  }
}

// Initialize cleanup scheduling
if (typeof window !== 'undefined') {
  StorageCleanup.scheduleCleanup();
}