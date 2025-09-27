// Validation schemas and rules for routine builder forms

import { validatePhoneticConfiguration } from '../utils/phoneticFiltering';
import { ExerciseStep, RoutineMetadata } from '../types/routineBuilder';

export interface RoutineValidationErrors {
  name?: string;
  description?: string;
  gradeLevel?: string;
  steps?: string;
  phonetic?: string;
}

export interface StepValidationErrors {
  mode?: string;
  duration?: string;
  repetitions?: string;
  vowels?: string;
  consonants?: string;
  syllables?: string;
  position?: string;
  intermissionText?: string;
}

/**
 * Validates routine metadata (name, description, grade level)
 */
export const validateRoutineMetadata = (metadata: Partial<RoutineMetadata>): RoutineValidationErrors => {
  const errors: RoutineValidationErrors = {};

  // Validate name
  if (!metadata.name || metadata.name.trim().length === 0) {
    errors.name = 'Routine name is required';
  } else if (metadata.name.trim().length < 3) {
    errors.name = 'Routine name must be at least 3 characters long';
  } else if (metadata.name.trim().length > 100) {
    errors.name = 'Routine name must be less than 100 characters';
  }

  // Validate grade level
  if (!metadata.age || metadata.age === '') {
    errors.gradeLevel = 'Grade level is required';
  }

  return errors;
};

/**
 * Validates an individual exercise step
 */
export const validateExerciseStep = (step: Partial<ExerciseStep>): StepValidationErrors => {
  const errors: StepValidationErrors = {};

  // Validate mode
  if (!step.mode) {
    errors.mode = 'Exercise mode is required';
  } else if (!['Word', 'Sentence', 'Intermission'].includes(step.mode)) {
    errors.mode = 'Invalid exercise mode';
  }

  // Validate duration
  if (step.rangeVal === undefined || step.rangeVal === null) {
    errors.duration = 'Duration is required';
  } else if (step.rangeVal < 1) {
    errors.duration = 'Duration must be at least 1 second';
  } else if (step.rangeVal > 300) {
    errors.duration = 'Duration cannot exceed 300 seconds (5 minutes)';
  }

  // Validate repetitions
  if (step.repetitions === undefined || step.repetitions === null) {
    errors.repetitions = 'Repetitions is required';
  } else if (step.repetitions < 1) {
    errors.repetitions = 'Repetitions must be at least 1';
  } else if (step.repetitions > 100) {
    errors.repetitions = 'Repetitions cannot exceed 100';
  }

  // Validate phonetic configuration for non-intermission steps
  if (step.mode && step.mode !== 'Intermission') {
    const phoneticValidation = validatePhoneticConfiguration({
      vowels: step.vowels || [],
      consonants: step.consonants || [],
      syllables: step.syllables || [],
      position: step.position || 'initial',
      gradeLevel: '0', // This would come from parent routine
      mode: step.mode
    });

    if (!phoneticValidation.isValid) {
      errors.phonetic = phoneticValidation.message;
    }

    // Additional phonetic validations
    if (step.mode === 'Word' && (!step.vowels || step.vowels.length === 0) && (!step.consonants || step.consonants.length === 0)) {
      errors.phonetic = 'Word exercises require at least one vowel or consonant selection';
    }

    if (step.consonants && step.consonants.length > 0 && !step.position) {
      errors.position = 'Position is required when consonants are selected';
    }
  }

  // Validate intermission text for intermission steps
  if (step.mode === 'Intermission') {
    if (!step.intermissionText || step.intermissionText.trim().length === 0) {
      errors.intermissionText = 'Intermission text is required for intermission steps';
    } else if (step.intermissionText.trim().length > 500) {
      errors.intermissionText = 'Intermission text must be less than 500 characters';
    }
  }

  return errors;
};

/**
 * Validates the entire routine (metadata + steps)
 */
export const validateRoutine = (
  metadata: Partial<RoutineMetadata>, 
  steps: ExerciseStep[]
): RoutineValidationErrors => {
  const errors: RoutineValidationErrors = {};

  // Validate metadata
  const metadataErrors = validateRoutineMetadata(metadata);
  Object.assign(errors, metadataErrors);

  // Validate steps
  if (!steps || steps.length === 0) {
    errors.steps = 'Routine must have at least one exercise step';
  } else {
    // Check for step validation errors
    const stepErrors = steps.map(step => validateExerciseStep(step));
    const hasStepErrors = stepErrors.some(stepError => Object.keys(stepError).length > 0);
    
    if (hasStepErrors) {
      errors.steps = 'One or more exercise steps have validation errors';
    }

    // Validate routine structure
    const hasNonIntermissionSteps = steps.some(step => step.mode !== 'Intermission');
    if (!hasNonIntermissionSteps) {
      errors.steps = 'Routine must have at least one non-intermission exercise step';
    }

    // Check for reasonable routine length
    const totalDuration = steps.reduce((total, step) => total + (step.rangeVal * step.repetitions), 0);
    if (totalDuration > 3600) { // 1 hour
      errors.steps = 'Total routine duration cannot exceed 1 hour';
    }
  }

  return errors;
};

/**
 * Checks if validation errors object has any errors
 */
export const hasValidationErrors = (errors: RoutineValidationErrors | StepValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};

/**
 * Gets a summary of validation errors for display
 */
export const getValidationErrorSummary = (errors: RoutineValidationErrors): string[] => {
  const errorMessages: string[] = [];

  if (errors.name) errorMessages.push(`Name: ${errors.name}`);
  if (errors.description) errorMessages.push(`Description: ${errors.description}`);
  if (errors.gradeLevel) errorMessages.push(`Grade Level: ${errors.gradeLevel}`);
  if (errors.steps) errorMessages.push(`Steps: ${errors.steps}`);
  if (errors.phonetic) errorMessages.push(`Phonetic Configuration: ${errors.phonetic}`);

  return errorMessages;
};

/**
 * Real-time validation rules for form fields
 */
export const getFieldValidationRules = () => {
  return {
    routineName: {
      required: 'Routine name is required',
      minLength: {
        value: 3,
        message: 'Routine name must be at least 3 characters long'
      },
      maxLength: {
        value: 100,
        message: 'Routine name must be less than 100 characters'
      }
    },
    duration: {
      required: 'Duration is required',
      min: {
        value: 1,
        message: 'Duration must be at least 1 second'
      },
      max: {
        value: 300,
        message: 'Duration cannot exceed 300 seconds'
      }
    },
    repetitions: {
      required: 'Repetitions is required',
      min: {
        value: 1,
        message: 'Repetitions must be at least 1'
      },
      max: {
        value: 100,
        message: 'Repetitions cannot exceed 100'
      }
    },
    intermissionText: {
      required: 'Intermission text is required',
      maxLength: {
        value: 500,
        message: 'Intermission text must be less than 500 characters'
      }
    }
  };
};