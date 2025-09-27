import React, { useEffect, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Alert, Snackbar } from '@mui/material';

// Import validation utilities
import { 
  validateRoutineMetadata, 
  validateExerciseStep, 
  validateRoutine,
  hasValidationErrors,
  getValidationErrorSummary,
  getFieldValidationRules 
} from '../../../validation/routineValidation';

// Import form persistence utilities
import { FormStatePersistence } from '../../../utils/formPersistence';

// Import types
import { ExerciseStep, RoutineMetadata } from '../../../types/routineBuilder';

export interface RoutineFormData {
  metadata: RoutineMetadata;
  currentStep: ExerciseStep;
  steps: ExerciseStep[];
}

interface RoutineFormManagerProps {
  initialData: Partial<RoutineFormData>;
  routineId: number;
  onFormChange: (data: Partial<RoutineFormData>) => void;
  onValidationChange: (isValid: boolean, errors: any) => void;
  enablePersistence?: boolean;
  children: (formMethods: any, validation: any) => React.ReactNode;
}

const RoutineFormManager: React.FC<RoutineFormManagerProps> = ({
  initialData,
  routineId,
  onFormChange,
  onValidationChange,
  enablePersistence = true,
  children
}) => {
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [formPersistence] = useState(() => 
    enablePersistence ? new FormStatePersistence(routineId) : null
  );

  // Initialize form with React Hook Form
  const formMethods = useForm<RoutineFormData>({
    defaultValues: initialData,
    mode: 'onChange', // Validate on change for real-time feedback
    criteriaMode: 'all' // Show all validation errors
  });

  const { watch, setValue, getValues, trigger, formState } = formMethods;

  // Watch all form values for changes
  const watchedValues = watch();

  // Load persisted form state on mount
  useEffect(() => {
    if (formPersistence && routineId) {
      const savedState = formPersistence.load();
      
      if (savedState) {
        // Restore form state from localStorage
        if (savedState.metadata) {
          Object.keys(savedState.metadata).forEach(key => {
            setValue(`metadata.${key}` as any, (savedState.metadata as any)[key]);
          });
        }
        
        if (savedState.currentStep) {
          Object.keys(savedState.currentStep).forEach(key => {
            setValue(`currentStep.${key}` as any, (savedState.currentStep as any)[key]);
          });
        }
        
        if (savedState.steps) {
          setValue('steps', savedState.steps);
        }
      }
    }
  }, [routineId, formPersistence, setValue]);

  // Persist form state when values change
  useEffect(() => {
    if (formPersistence && routineId) {
      const currentValues = getValues();
      
      formPersistence.debouncedSave({
        metadata: currentValues.metadata,
        currentStep: currentValues.currentStep,
        steps: currentValues.steps,
        currentStepIndex: 0 // This would be managed by parent component
      });
    }
  }, [watchedValues, formPersistence, routineId, getValues]);

  // Validate form data when it changes
  useEffect(() => {
    const validateFormData = async () => {
      const currentValues = getValues();
      
      // Validate metadata
      const metadataErrors = validateRoutineMetadata(currentValues.metadata || {});
      
      // Validate current step
      const stepErrors = validateExerciseStep(currentValues.currentStep || {});
      
      // Validate entire routine
      const routineErrors = validateRoutine(
        currentValues.metadata || {}, 
        currentValues.steps || []
      );

      const allErrors = {
        metadata: metadataErrors,
        currentStep: stepErrors,
        routine: routineErrors
      };

      setValidationErrors(allErrors);

      // Check if form is valid
      const isValid = !hasValidationErrors(metadataErrors) && 
                     !hasValidationErrors(stepErrors) && 
                     !hasValidationErrors(routineErrors);

      // Notify parent of validation state
      onValidationChange(isValid, allErrors);

      // Trigger React Hook Form validation
      await trigger();
    };

    validateFormData();
  }, [watchedValues, getValues, trigger, onValidationChange]);

  // Notify parent of form changes
  useEffect(() => {
    onFormChange(watchedValues);
  }, [watchedValues, onFormChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (formPersistence) {
        formPersistence.cleanup();
      }
    };
  }, [formPersistence]);

  // Handle validation alert close
  const handleValidationAlertClose = () => {
    setShowValidationAlert(false);
  };

  // Show validation errors if any
  const showValidationErrors = () => {
    const errorSummary = getValidationErrorSummary(validationErrors.routine || {});
    
    if (errorSummary.length > 0) {
      setShowValidationAlert(true);
    }
  };

  // Get field validation rules for React Hook Form
  const fieldRules = getFieldValidationRules();

  // Validation helper object to pass to children
  const validation = {
    errors: validationErrors,
    isValid: !hasValidationErrors(validationErrors.routine || {}),
    fieldRules,
    showErrors: showValidationErrors,
    clearPersistedState: () => formPersistence?.clear()
  };

  return (
    <FormProvider {...formMethods}>
      {children(formMethods, validation)}
      
      {/* Validation Alert */}
      <Snackbar
        open={showValidationAlert}
        autoHideDuration={6000}
        onClose={handleValidationAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleValidationAlertClose} 
          severity="warning" 
          sx={{ width: '100%' }}
        >
          <strong>Validation Errors:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            {getValidationErrorSummary(validationErrors.routine || {}).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      </Snackbar>
    </FormProvider>
  );
};

export default RoutineFormManager;