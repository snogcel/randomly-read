import React, { useState, useCallback } from 'react';
import { Grid, Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from '../../../themeHandler';

// Import form management components
import RoutineFormManager, { RoutineFormData } from './RoutineFormManager';

// Import refactored components
import RoutineMetadata from './RoutineMetadata';
import ExerciseStepList from './ExerciseStepList';
import StepEditor from './StepEditor';
import RoutinePreview from './RoutinePreview';
import PhoneticSelectorEnhanced from './PhoneticSelectorEnhanced';

// Import types
import { RoutineBuilderProps } from '../../../types/routineBuilder';

// Import validation utilities
import { hasValidationErrors } from '../../../validation/routineValidation';

// Import form persistence utilities
import { hasSavedFormStates, getSavedFormStateRoutines, clearFormState } from '../../../utils/formPersistence';

const ValidatedRoutineBuilder: React.FC<RoutineBuilderProps> = (props) => {
  const theme = useTheme();
  const classes = styles(theme);
  
  // Local state for form management
  const [formData, setFormData] = useState<Partial<RoutineFormData>>({});
  const [validationState, setValidationState] = useState({ isValid: true, errors: {} });
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [showPersistenceDialog, setShowPersistenceDialog] = useState(false);
  const [savedRoutines, setSavedRoutines] = useState<Array<{ routineId: string; timestamp: number }>>([]);

  // Check for saved form states on mount
  React.useEffect(() => {
    if (hasSavedFormStates()) {
      setSavedRoutines(getSavedFormStateRoutines());
      setShowPersistenceDialog(true);
    }
  }, []);

  // Handle form data changes
  const handleFormChange = useCallback((data: Partial<RoutineFormData>) => {
    setFormData(data);
    
    // Update parent component state if needed
    if (data.metadata) {
      if (data.metadata.name !== props.name) {
        props.updateName(data.metadata.name || '');
      }
      if (data.metadata.description !== props.description) {
        props.updateDescription(data.metadata.description);
      }
      if (data.metadata.age !== props.age) {
        props.updateGradeLevel(data.metadata.age || '0');
      }
    }
  }, [props]);

  // Handle validation state changes
  const handleValidationChange = useCallback((isValid: boolean, errors: any) => {
    setValidationState({ isValid, errors });
  }, []);

  // Handle save with validation
  const handleSaveWithValidation = () => {
    if (!validationState.isValid) {
      setShowValidationDialog(true);
      return false;
    }
    
    // Proceed with normal save
    return true;
  };

  // Handle persistence dialog actions
  const handleRestoreFormState = (routineId: string) => {
    // This would restore the form state for the selected routine
    setShowPersistenceDialog(false);
  };

  const handleClearSavedState = (routineId: string) => {
    clearFormState(routineId);
    setSavedRoutines(prev => prev.filter(r => r.routineId !== routineId));
  };

  const handleClearAllSavedStates = () => {
    savedRoutines.forEach(routine => clearFormState(routine.routineId));
    setSavedRoutines([]);
    setShowPersistenceDialog(false);
  };

  // Prepare initial form data
  const initialFormData: Partial<RoutineFormData> = {
    metadata: {
      id: props.id,
      name: props.name,
      description: props.description,
      age: props.age
    },
    currentStep: {
      index: props.index,
      rangeVal: props.rangeVal,
      repetitions: props.repetitions,
      mode: props.mode,
      isIntermission: props.isIntermission,
      vowels: props.vowels,
      consonants: props.consonants,
      syllables: props.syllables,
      position: props.position,
      intermissionText: props.intermissionText
    },
    steps: props.routine
  };

  return (
    <RoutineFormManager
      initialData={initialFormData}
      routineId={props.id}
      onFormChange={handleFormChange}
      onValidationChange={handleValidationChange}
      enablePersistence={true}
    >
      {(formMethods, validation) => (
        <Grid container spacing={2}>
          {/* Validation Status Alert */}
          {!validation.isValid && (
            <Grid item xs={12}>
              <Alert severity="warning" action={
                <Button color="inherit" size="small" onClick={validation.showErrors}>
                  View Details
                </Button>
              }>
                This routine has validation errors that need to be addressed before saving.
              </Alert>
            </Grid>
          )}

          {/* Routine Metadata with Validation */}
          <Grid item xs={12}>
            <RoutineMetadata
              name={formData.metadata?.name || props.name}
              description={formData.metadata?.description || props.description}
              onNameChange={props.updateName}
              onDescriptionChange={props.updateDescription}
              showDescriptionEditor={true}
              onToggleDescriptionEditor={() => {}}
            />
            
            {/* Show metadata validation errors */}
            {validation.errors.metadata && hasValidationErrors(validation.errors.metadata) && (
              <Alert severity="error" style={{ marginTop: 8 }}>
                <strong>Metadata Errors:</strong>
                <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                  {Object.values(validation.errors.metadata).map((error: any, index: number) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            )}
          </Grid>

          {/* Exercise Step List */}
          <Grid item xs={12} md={6}>
            <ExerciseStepList
              routine={props.routine}
              currentIndex={props.index}
              onStepSelect={(index) => {
                // Handle step selection with validation
                if (validation.isValid || window.confirm('You have unsaved changes. Continue anyway?')) {
                  // Proceed with step selection
                }
              }}
            />
          </Grid>

          {/* Step Editor with Enhanced Phonetic Configuration */}
          <Grid item xs={12} md={6}>
            <PhoneticSelectorEnhanced
              vowels={props.vowels}
              consonants={props.consonants}
              syllables={props.syllables}
              position={props.position}
              gradeLevel={props.age}
              mode={props.mode}
              availableVowels={[]} // These would be passed from parent
              availableConsonants={[]} // These would be passed from parent
              availableSyllables={[]} // These would be passed from parent
              availablePositions={[]} // These would be passed from parent
              onVowelChange={props.updateVowels}
              onConsonantChange={(consonant, value) => {
                if (value) {
                  props.addConsonant(consonant);
                } else {
                  props.removeConsonant(consonant);
                }
              }}
              onSyllableChange={(syllables) => {
                // Convert syllable names back to IDs
                const syllableIds = syllables.map(name => parseInt(name)).filter(id => !isNaN(id));
                props.updateSyllables(syllableIds);
              }}
              onPositionChange={props.updatePosition}
              onRemoveConsonant={props.removeConsonant}
              disabled={false}
              showDescription={true}
            />
            
            {/* Show step validation errors */}
            {validation.errors.currentStep && hasValidationErrors(validation.errors.currentStep) && (
              <Alert severity="error" style={{ marginTop: 8 }}>
                <strong>Step Configuration Errors:</strong>
                <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                  {Object.values(validation.errors.currentStep).map((error: any, index: number) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            )}
          </Grid>

          {/* Routine Preview */}
          <Grid item xs={12}>
            <RoutinePreview
              routineStep={formData.currentStep || {
                index: props.index,
                rangeVal: props.rangeVal,
                repetitions: props.repetitions,
                mode: props.mode,
                isIntermission: props.isIntermission,
                vowels: props.vowels,
                consonants: props.consonants,
                syllables: props.syllables,
                position: props.position,
                intermissionText: props.intermissionText
              }}
              onPreview={() => {}}
              open={false}
              onClose={() => {}}
            />
          </Grid>

          {/* Validation Dialog */}
          <Dialog open={showValidationDialog} onClose={() => setShowValidationDialog(false)}>
            <DialogTitle>Validation Errors</DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                The following validation errors must be resolved before saving:
              </Typography>
              {/* List validation errors here */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowValidationDialog(false)}>
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Form Persistence Dialog */}
          <Dialog open={showPersistenceDialog} onClose={() => setShowPersistenceDialog(false)}>
            <DialogTitle>Restore Saved Work</DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                You have unsaved work from previous sessions. Would you like to restore it?
              </Typography>
              {savedRoutines.map(routine => (
                <div key={routine.routineId} style={{ margin: '8px 0' }}>
                  <Typography variant="body2">
                    Routine ID: {routine.routineId} (saved {new Date(routine.timestamp).toLocaleString()})
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={() => handleRestoreFormState(routine.routineId)}
                  >
                    Restore
                  </Button>
                  <Button 
                    size="small" 
                    color="secondary"
                    onClick={() => handleClearSavedState(routine.routineId)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClearAllSavedStates} color="secondary">
                Clear All
              </Button>
              <Button onClick={() => setShowPersistenceDialog(false)}>
                Continue Without Restoring
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </RoutineFormManager>
  );
};

export default ValidatedRoutineBuilder;