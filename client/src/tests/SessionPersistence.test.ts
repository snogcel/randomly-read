import { SessionPersistence, StorageCleanup } from '../utils/sessionPersistence';
import type { ExerciseSession } from '../contexts/ExerciseContext';
import type { RoutineBuilderState } from '../contexts/RoutineContext';

describe('Session Persistence Tests', () => {
  const mockExerciseSession: ExerciseSession = {
    id: 'session-123',
    userId: 'user-456',
    routineId: 'routine-789',
    startTime: new Date('2025-01-15T10:00:00Z'),
    endTime: new Date('2025-01-15T10:15:00Z'),
    currentWordIndex: 2,
    words: [
      {
        id: 'word-1',
        lexeme: 'cat',
        phonetic: 'kæt',
        consonants: ['K', 'T'],
        vowels: ['AE'],
        syllables: 1,
        gradeLevel: '1',
        difficulty: 2
      },
      {
        id: 'word-2',
        lexeme: 'dog',
        phonetic: 'dɔg',
        consonants: ['D', 'G'],
        vowels: ['AO'],
        syllables: 1,
        gradeLevel: '1',
        difficulty: 1
      }
    ],
    attempts: [
      {
        wordId: 'word-1',
        lexeme: 'cat',
        timestamp: new Date('2025-01-15T10:05:00Z'),
        accuracy: 0.9,
        timeSpent: 3000,
        difficulty: 2,
        exerciseType: 'word',
        position: 'initial',
        phonetics: {
          vowels: ['AE'],
          consonants: ['K', 'T'],
          syllables: 1
        }
      }
    ],
    isActive: false,
    isPaused: false,
    settings: {
      duration: 3,
      autoAdvance: true,
      showPhonetics: false,
      fontSize: 'medium',
      mode: 'word',
      vowels: ['A', 'E'],
      consonants: ['B', 'C'],
      syllables: [1, 2],
      position: 'initial',
      gradeLevel: '2'
    }
  };

  const mockRoutineBuilder: RoutineBuilderState = {
    id: 'builder-123',
    name: 'Test Routine',
    description: 'A test routine for persistence',
    gradeLevel: '3',
    category: 'custom',
    steps: [
      {
        id: 'step-1',
        type: 'word',
        duration: 4,
        repetitions: 3,
        mode: 'Word',
        vowels: ['A', 'I'],
        consonants: ['B', 'T'],
        syllables: [1, 2],
        position: 'initial',
        rangeVal: 4
      }
    ],
    currentStepIndex: 0,
    isValid: true,
    isDirty: true,
    errors: {}
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Exercise Session Persistence', () => {
    it('should save and load exercise sessions correctly', () => {
      // Save session
      const saveResult = SessionPersistence.saveExerciseSession(mockExerciseSession);
      expect(saveResult).toBe(true);

      // Load session
      const loadedSession = SessionPersistence.loadExerciseSession();
      expect(loadedSession).not.toBeNull();
      expect(loadedSession!.id).toBe(mockExerciseSession.id);
      expect(loadedSession!.userId).toBe(mockExerciseSession.userId);
      expect(loadedSession!.routineId).toBe(mockExerciseSession.routineId);
      expect(loadedSession!.startTime).toEqual(mockExerciseSession.startTime);
      expect(loadedSession!.endTime).toEqual(mockExerciseSession.endTime);
      expect(loadedSession!.words).toEqual(mockExerciseSession.words);
      expect(loadedSession!.attempts).toHaveLength(1);
      expect(loadedSession!.attempts[0].timestamp).toEqual(mockExerciseSession.attempts[0].timestamp);
    });

    it('should handle date serialization correctly', () => {
      SessionPersistence.saveExerciseSession(mockExerciseSession);
      const loadedSession = SessionPersistence.loadExerciseSession();

      expect(loadedSession!.startTime).toBeInstanceOf(Date);
      expect(loadedSession!.endTime).toBeInstanceOf(Date);
      expect(loadedSession!.attempts[0].timestamp).toBeInstanceOf(Date);
    });

    it('should reject old sessions (>24 hours)', () => {
      const oldSession = {
        ...mockExerciseSession,
        startTime: new Date(Date.now() - 25 * 60 * 60 * 1000) // 25 hours ago
      };

      SessionPersistence.saveExerciseSession(oldSession);
      const loadedSession = SessionPersistence.loadExerciseSession();

      expect(loadedSession).toBeNull();
      // Should also clear the old session
      expect(localStorage.getItem('randomlyread_exercise_session')).toBeNull();
    });

    it('should handle corrupted session data gracefully', () => {
      // Save corrupted data
      localStorage.setItem('randomlyread_exercise_session', 'invalid json');

      const loadedSession = SessionPersistence.loadExerciseSession();
      expect(loadedSession).toBeNull();
      
      // Should clear corrupted data
      expect(localStorage.getItem('randomlyread_exercise_session')).toBeNull();
    });

    it('should clear exercise sessions', () => {
      SessionPersistence.saveExerciseSession(mockExerciseSession);
      expect(localStorage.getItem('randomlyread_exercise_session')).not.toBeNull();

      SessionPersistence.clearExerciseSession();
      expect(localStorage.getItem('randomlyread_exercise_session')).toBeNull();
    });
  });

  describe('Routine Builder Persistence', () => {
    it('should save and load routine builder state correctly', () => {
      const saveResult = SessionPersistence.saveRoutineBuilder(mockRoutineBuilder);
      expect(saveResult).toBe(true);

      const loadedBuilder = SessionPersistence.loadRoutineBuilder();
      expect(loadedBuilder).not.toBeNull();
      expect(loadedBuilder!.id).toBe(mockRoutineBuilder.id);
      expect(loadedBuilder!.name).toBe(mockRoutineBuilder.name);
      expect(loadedBuilder!.description).toBe(mockRoutineBuilder.description);
      expect(loadedBuilder!.steps).toEqual(mockRoutineBuilder.steps);
      expect(loadedBuilder!.isValid).toBe(mockRoutineBuilder.isValid);
      expect(loadedBuilder!.isDirty).toBe(mockRoutineBuilder.isDirty);
    });

    it('should not save empty routine builder state', () => {
      const emptyBuilder: RoutineBuilderState = {
        name: '',
        description: '',
        gradeLevel: '0',
        category: 'custom',
        steps: [],
        currentStepIndex: -1,
        isValid: false,
        isDirty: false,
        errors: {}
      };

      SessionPersistence.saveRoutineBuilder(emptyBuilder);
      const loadedBuilder = SessionPersistence.loadRoutineBuilder();
      
      expect(loadedBuilder).toBeNull();
    });

    it('should handle corrupted builder data gracefully', () => {
      localStorage.setItem('randomlyread_routine_builder', 'invalid json');

      const loadedBuilder = SessionPersistence.loadRoutineBuilder();
      expect(loadedBuilder).toBeNull();
      
      // Should clear corrupted data
      expect(localStorage.getItem('randomlyread_routine_builder')).toBeNull();
    });

    it('should clear routine builder state', () => {
      SessionPersistence.saveRoutineBuilder(mockRoutineBuilder);
      expect(localStorage.getItem('randomlyread_routine_builder')).not.toBeNull();

      SessionPersistence.clearRoutineBuilder();
      expect(localStorage.getItem('randomlyread_routine_builder')).toBeNull();
    });
  });

  describe('User Preferences Persistence', () => {
    const mockPreferences = {
      theme: 'dark',
      fontSize: 'large',
      autoSave: true,
      notifications: false,
      language: 'en'
    };

    it('should save and load user preferences correctly', () => {
      const saveResult = SessionPersistence.saveUserPreferences(mockPreferences);
      expect(saveResult).toBe(true);

      const loadedPreferences = SessionPersistence.loadUserPreferences();
      expect(loadedPreferences).toEqual(mockPreferences);
    });

    it('should handle empty preferences', () => {
      SessionPersistence.saveUserPreferences({});
      const loadedPreferences = SessionPersistence.loadUserPreferences();
      expect(loadedPreferences).toEqual({});
    });

    it('should handle corrupted preferences gracefully', () => {
      localStorage.setItem('randomlyread_user_preferences', 'invalid json');

      const loadedPreferences = SessionPersistence.loadUserPreferences();
      expect(loadedPreferences).toBeNull();
      
      // Should clear corrupted data
      expect(localStorage.getItem('randomlyread_user_preferences')).toBeNull();
    });

    it('should clear user preferences', () => {
      SessionPersistence.saveUserPreferences(mockPreferences);
      expect(localStorage.getItem('randomlyread_user_preferences')).not.toBeNull();

      SessionPersistence.clearUserPreferences();
      expect(localStorage.getItem('randomlyread_user_preferences')).toBeNull();
    });
  });

  describe('Storage Availability and Error Handling', () => {
    it('should handle localStorage unavailability', () => {
      // Mock localStorage to be unavailable
      const originalLocalStorage = window.localStorage;
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        writable: true
      });

      const saveResult = SessionPersistence.saveExerciseSession(mockExerciseSession);
      expect(saveResult).toBe(false);

      const loadedSession = SessionPersistence.loadExerciseSession();
      expect(loadedSession).toBeNull();

      // Restore localStorage
      Object.defineProperty(window, 'localStorage', {
        value: originalLocalStorage,
        writable: true
      });
    });

    it('should handle storage quota exceeded', () => {
      // Mock localStorage.setItem to throw quota exceeded error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = jest.fn(() => {
        throw new DOMException('QuotaExceededError');
      });

      const saveResult = SessionPersistence.saveExerciseSession(mockExerciseSession);
      expect(saveResult).toBe(false);

      // Restore setItem
      localStorage.setItem = originalSetItem;
    });

    it('should provide storage usage information', () => {
      // Add some data to localStorage
      SessionPersistence.saveExerciseSession(mockExerciseSession);
      SessionPersistence.saveRoutineBuilder(mockRoutineBuilder);

      const storageInfo = SessionPersistence.getStorageInfo();
      expect(storageInfo.used).toBeGreaterThan(0);
      expect(storageInfo.available).toBeGreaterThanOrEqual(0);
      expect(storageInfo.percentage).toBeGreaterThanOrEqual(0);
      expect(storageInfo.percentage).toBeLessThanOrEqual(100);
    });
  });

  describe('Bulk Operations', () => {
    it('should clear all stored data', () => {
      // Add data to all storage keys
      SessionPersistence.saveExerciseSession(mockExerciseSession);
      SessionPersistence.saveRoutineBuilder(mockRoutineBuilder);
      SessionPersistence.saveUserPreferences({ theme: 'dark' });

      // Verify data exists
      expect(localStorage.getItem('randomlyread_exercise_session')).not.toBeNull();
      expect(localStorage.getItem('randomlyread_routine_builder')).not.toBeNull();
      expect(localStorage.getItem('randomlyread_user_preferences')).not.toBeNull();

      // Clear all
      SessionPersistence.clearAll();

      // Verify all data is cleared
      expect(localStorage.getItem('randomlyread_exercise_session')).toBeNull();
      expect(localStorage.getItem('randomlyread_routine_builder')).toBeNull();
      expect(localStorage.getItem('randomlyread_user_preferences')).toBeNull();
    });
  });

  describe('Storage Cleanup', () => {
    it('should schedule cleanup operations', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      // Test cleanup scheduling (this is mainly for coverage)
      StorageCleanup.cleanupOldSessions();
      
      expect(consoleSpy).toHaveBeenCalledWith('Storage cleanup completed');
      consoleSpy.mockRestore();
    });

    it('should handle cleanup errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      // Mock error in cleanup
      const originalGetItem = localStorage.getItem;
      localStorage.getItem = jest.fn(() => {
        throw new Error('Storage error');
      });

      // Should not crash
      StorageCleanup.cleanupOldSessions();
      
      localStorage.getItem = originalGetItem;
      consoleSpy.mockRestore();
    });
  });

  describe('Performance Tests', () => {
    it('should handle large session data efficiently', () => {
      // Create large session with many attempts
      const largeSession: ExerciseSession = {
        ...mockExerciseSession,
        attempts: Array.from({ length: 1000 }, (_, i) => ({
          wordId: `word-${i}`,
          lexeme: `word-${i}`,
          timestamp: new Date(),
          accuracy: Math.random(),
          timeSpent: Math.random() * 5000,
          difficulty: Math.floor(Math.random() * 5) + 1,
          exerciseType: 'word' as const,
          position: 'initial' as const,
          phonetics: {
            vowels: ['A'],
            consonants: ['B'],
            syllables: 1
          }
        }))
      };

      const startTime = performance.now();
      
      const saveResult = SessionPersistence.saveExerciseSession(largeSession);
      const loadedSession = SessionPersistence.loadExerciseSession();
      
      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(saveResult).toBe(true);
      expect(loadedSession).not.toBeNull();
      expect(loadedSession!.attempts).toHaveLength(1000);
      
      // Should complete within reasonable time (1 second)
      expect(duration).toBeLessThan(1000);
    });

    it('should handle rapid save/load operations', () => {
      const startTime = performance.now();

      // Perform rapid operations
      for (let i = 0; i < 100; i++) {
        const session = {
          ...mockExerciseSession,
          id: `session-${i}`
        };
        SessionPersistence.saveExerciseSession(session);
        SessionPersistence.loadExerciseSession();
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within reasonable time (500ms)
      expect(duration).toBeLessThan(500);
    });
  });
});