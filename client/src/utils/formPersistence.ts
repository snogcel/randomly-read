// Utilities for persisting form state during routine building

import { ExerciseStep, RoutineMetadata } from '../types/routineBuilder';

const STORAGE_PREFIX = 'routineBuilder_';
const STORAGE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export interface PersistedFormState {
  metadata: Partial<RoutineMetadata>;
  currentStep: Partial<ExerciseStep>;
  steps: ExerciseStep[];
  currentStepIndex: number;
  timestamp: number;
}

/**
 * Saves form state to localStorage with expiry
 */
export const saveFormState = (
  routineId: number | string,
  state: Partial<PersistedFormState>
): void => {
  try {
    const storageKey = `${STORAGE_PREFIX}${routineId}`;
    const dataToSave = {
      ...state,
      timestamp: Date.now()
    };
    
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  } catch (error) {
    console.warn('Failed to save form state to localStorage:', error);
  }
};

/**
 * Loads form state from localStorage, checking expiry
 */
export const loadFormState = (
  routineId: number | string
): PersistedFormState | null => {
  try {
    const storageKey = `${STORAGE_PREFIX}${routineId}`;
    const savedData = localStorage.getItem(storageKey);
    
    if (!savedData) {
      return null;
    }
    
    const parsedData: PersistedFormState = JSON.parse(savedData);
    
    // Check if data has expired
    if (Date.now() - parsedData.timestamp > STORAGE_EXPIRY) {
      clearFormState(routineId);
      return null;
    }
    
    return parsedData;
  } catch (error) {
    console.warn('Failed to load form state from localStorage:', error);
    return null;
  }
};

/**
 * Clears saved form state for a specific routine
 */
export const clearFormState = (routineId: number | string): void => {
  try {
    const storageKey = `${STORAGE_PREFIX}${routineId}`;
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.warn('Failed to clear form state from localStorage:', error);
  }
};

/**
 * Clears all expired form states
 */
export const clearExpiredFormStates = (): void => {
  try {
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith(STORAGE_PREFIX)) {
        const savedData = localStorage.getItem(key);
        
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            
            if (Date.now() - parsedData.timestamp > STORAGE_EXPIRY) {
              keysToRemove.push(key);
            }
          } catch (parseError) {
            // If we can't parse the data, it's probably corrupted, so remove it
            keysToRemove.push(key);
          }
        }
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.warn('Failed to clear expired form states:', error);
  }
};

/**
 * Auto-save form state with debouncing
 */
export class FormStatePersistence {
  private routineId: number | string;
  private saveTimeout: NodeJS.Timeout | null = null;
  private readonly debounceDelay = 1000; // 1 second

  constructor(routineId: number | string) {
    this.routineId = routineId;
  }

  /**
   * Debounced save - waits for a pause in updates before saving
   */
  debouncedSave(state: Partial<PersistedFormState>): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      saveFormState(this.routineId, state);
    }, this.debounceDelay);
  }

  /**
   * Immediate save - saves right away
   */
  immediateSave(state: Partial<PersistedFormState>): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
    
    saveFormState(this.routineId, state);
  }

  /**
   * Load saved state
   */
  load(): PersistedFormState | null {
    return loadFormState(this.routineId);
  }

  /**
   * Clear saved state
   */
  clear(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
    
    clearFormState(this.routineId);
  }

  /**
   * Cleanup - call when component unmounts
   */
  cleanup(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
  }
}

/**
 * Hook-like function to create a form persistence instance
 */
export const useFormPersistence = (routineId: number | string) => {
  return new FormStatePersistence(routineId);
};

/**
 * Utility to check if there are any saved form states
 */
export const hasSavedFormStates = (): boolean => {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith(STORAGE_PREFIX)) {
        const savedData = localStorage.getItem(key);
        
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            
            // Check if not expired
            if (Date.now() - parsedData.timestamp <= STORAGE_EXPIRY) {
              return true;
            }
          } catch (parseError) {
            // Ignore parsing errors
          }
        }
      }
    }
    
    return false;
  } catch (error) {
    console.warn('Failed to check for saved form states:', error);
    return false;
  }
};

/**
 * Get list of routines with saved form states
 */
export const getSavedFormStateRoutines = (): Array<{ routineId: string; timestamp: number }> => {
  const savedRoutines: Array<{ routineId: string; timestamp: number }> = [];
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith(STORAGE_PREFIX)) {
        const routineId = key.replace(STORAGE_PREFIX, '');
        const savedData = localStorage.getItem(key);
        
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            
            // Check if not expired
            if (Date.now() - parsedData.timestamp <= STORAGE_EXPIRY) {
              savedRoutines.push({
                routineId,
                timestamp: parsedData.timestamp
              });
            }
          } catch (parseError) {
            // Ignore parsing errors
          }
        }
      }
    }
  } catch (error) {
    console.warn('Failed to get saved form state routines:', error);
  }
  
  return savedRoutines.sort((a, b) => b.timestamp - a.timestamp);
};