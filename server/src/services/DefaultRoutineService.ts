import { logger } from '../utils/logger';
import defaultRoutinesConfig from '../config/defaultRoutines.json';

export interface DefaultRoutineConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isDefault: boolean;
  steps: DefaultRoutineStep[];
}

export interface DefaultRoutineStep {
  id: string;
  type: 'word' | 'sentence' | 'intermission';
  duration: number;
  repetitions: number;
  phoneticConfig?: {
    consonants: string[];
    vowels: string[];
    positions: string[];
    syllables: number[];
    grades: number[];
  };
  intermissionText?: string;
}

export class DefaultRoutineService {
  private static instance: DefaultRoutineService;
  private routines: DefaultRoutineConfig[];

  private constructor() {
    this.routines = defaultRoutinesConfig.defaultRoutines as DefaultRoutineConfig[];
    logger.info(`Loaded ${this.routines.length} default routines`);
  }

  public static getInstance(): DefaultRoutineService {
    if (!DefaultRoutineService.instance) {
      DefaultRoutineService.instance = new DefaultRoutineService();
    }
    return DefaultRoutineService.instance;
  }

  /**
   * Get all default routines
   */
  public getDefaultRoutines(): DefaultRoutineConfig[] {
    return this.routines;
  }

  /**
   * Get default routine by ID
   */
  public getDefaultRoutineById(id: string): DefaultRoutineConfig | null {
    const routine = this.routines.find(r => r.id === id);
    return routine || null;
  }

  /**
   * Get default routines by category
   */
  public getDefaultRoutinesByCategory(category: string): DefaultRoutineConfig[] {
    return this.routines.filter(r => r.category === category);
  }

  /**
   * Get default routines by difficulty
   */
  public getDefaultRoutinesByDifficulty(difficulty: string): DefaultRoutineConfig[] {
    return this.routines.filter(r => r.difficulty === difficulty);
  }

  /**
   * Convert default routine to user routine format
   */
  public convertToUserRoutine(defaultRoutine: DefaultRoutineConfig, userId: string) {
    return {
      name: defaultRoutine.name,
      description: defaultRoutine.description,
      category: defaultRoutine.category,
      difficulty: defaultRoutine.difficulty,
      isDefault: true,
      defaultRoutineId: defaultRoutine.id,
      createdBy: userId,
      steps: defaultRoutine.steps.map(step => ({
        ...step,
        _id: undefined // Let MongoDB generate new IDs
      })),
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * Get recommended routine for user level
   */
  public getRecommendedRoutine(userLevel?: string): DefaultRoutineConfig {
    const level = userLevel || 'beginner';
    
    const routinesByLevel = this.getDefaultRoutinesByDifficulty(level);
    if (routinesByLevel.length > 0) {
      return routinesByLevel[0];
    }

    // Fallback to beginner if no routines found for level
    const beginnerRoutines = this.getDefaultRoutinesByDifficulty('beginner');
    if (beginnerRoutines.length > 0) {
      return beginnerRoutines[0];
    }

    // Final fallback to first routine
    if (this.routines.length > 0) {
      return this.routines[0];
    }

    throw new Error('No default routines available');
  }

  /**
   * Validate routine configuration
   */
  public validateRoutineConfig(routine: DefaultRoutineConfig): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!routine.id || routine.id.trim() === '') {
      errors.push('Routine ID is required');
    }

    if (!routine.name || routine.name.trim() === '') {
      errors.push('Routine name is required');
    }

    if (!routine.steps || routine.steps.length === 0) {
      errors.push('Routine must have at least one step');
    }

    routine.steps?.forEach((step, index) => {
      if (!step.id || step.id.trim() === '') {
        errors.push(`Step ${index + 1}: ID is required`);
      }

      if (!['word', 'sentence', 'intermission'].includes(step.type)) {
        errors.push(`Step ${index + 1}: Invalid step type`);
      }

      if (step.duration < 1 || step.duration > 3600) {
        errors.push(`Step ${index + 1}: Duration must be between 1 and 3600 seconds`);
      }

      if (step.repetitions < 1 || step.repetitions > 1000) {
        errors.push(`Step ${index + 1}: Repetitions must be between 1 and 1000`);
      }

      if ((step.type === 'word' || step.type === 'sentence') && !step.phoneticConfig) {
        errors.push(`Step ${index + 1}: Phonetic configuration required for ${step.type} steps`);
      }

      if (step.type === 'intermission' && !step.intermissionText) {
        errors.push(`Step ${index + 1}: Intermission text required for intermission steps`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const defaultRoutineService = DefaultRoutineService.getInstance();