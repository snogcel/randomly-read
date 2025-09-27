import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Hidden } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styles } from '../../themeHandler';

// Import refactored components
import RoutineMetadata from './components/RoutineMetadata';
import ExerciseStepList from './components/ExerciseStepList';
import StepEditor from './components/StepEditor';
import RoutinePreview from './components/RoutinePreview';

// Import existing elements that are still needed
import NewRoutineButton from './elements/NewRoutineButton';
import DeleteRoutineButton from './elements/DeleteRoutineButton';
import UserSelect from './elements/UserSelect';
import RoutinesSelect from './elements/RoutinesSelect';
import GradeLevelSelect from './elements/GradeSelect';

// Import utility functions
import getBlacklist from '../../util/blacklists';

// Import types
import { RoutineBuilderProps, VowelSound, ConsonantSound, SyllableOption, ModeOption, PositionOption, GradeLevelOption } from '../../types/routineBuilder';

// Constants - these should eventually be moved to a constants file
const availableSyllables: SyllableOption[] = [
  { id: 1, name: "1"},
  { id: 2, name: "2"},
  { id: 3, name: "3"},
  { id: 4, name: "4"},
  { id: 5, name: "5"}
];

const availableVowels: VowelSound[] = [
  { id: "AA", name: "ɑ"},
  { id: "AE", name: "æ"},
  { id: "AH", name: "ʌ"},
  { id: "AO", name: "ɔ"},
  { id: "AW", name: "aʊ"},
  { id: "AY", name: "aɪ"},
  { id: "EH", name: "ɛ"},
  { id: "ER", name: "ɝ"},
  { id: "EY", name: "eɪ"},
  { id: "IH", name: "ɪ"},
  { id: "IY", name: "i"},
  { id: "OW", name: "oʊ"},
  { id: "OY", name: "ɔɪ"},
  { id: "UH", name: "ʊ"},
  { id: "UW", name: "u"}
];

const availableConsonants: ConsonantSound[] = [
  { id: "AA", name: "ɑ"},
  { id: "AE", name: "æ"},
  { id: "AH", name: "ʌ"},
  { id: "AO", name: "ɔ"},
  { id: "AW", name: "aʊ"},
  { id: "AY", name: "aɪ"},
  { id: "EH", name: "ɛ"},
  { id: "ER", name: "ɝ"},
  { id: "EY", name: "eɪ"},
  { id: "IH", name: "ɪ"},
  { id: "IY", name: "i"},
  { id: "OW", name: "oʊ"},
  { id: "OY", name: "ɔɪ"},
  { id: "UH", name: "ʊ"},
  { id: "UW", name: "u"},
  { id: "B", name: "b"},
  { id: "CH", name: "tʃ"},
  { id: "D", name: "d"},
  { id: "DH", name: "ð"},
  { id: "F", name: "f"},
  { id: "G", name: "g"},
  { id: "HH", name: "h"},
  { id: "JH", name: "dʒ"},
  { id: "K", name: "k"},
  { id: "L", name: "l"},
  { id: "M", name: "m"},
  { id: "N", name: "n"},
  { id: "P", name: "p"},
  { id: "R", name: "ɹ"},
  { id: "S", name: "s"},
  { id: "SH", name: "ʃ"},
  { id: "T", name: "t"},
  { id: "TH", name: "θ"},
  { id: "V", name: "v"},
  { id: "W", name: "w"},
  { id: "Y", name: "j"},
  { id: "Z", name: "Z"},
  { id: "ZH", name: "ʒ"}
];

const defaultConsonants: ConsonantSound[] = [
  { id: "B", name: "b"},
  { id: "CH", name: "tʃ"},
  { id: "D", name: "d"},
  { id: "DH", name: "ð"},
  { id: "F", name: "f"},
  { id: "G", name: "g"},
  { id: "HH", name: "h"},
  { id: "JH", name: "dʒ"},
  { id: "K", name: "k"},
  { id: "L", name: "l"},
  { id: "M", name: "m"},
  { id: "N", name: "n"},
  { id: "P", name: "p"},
  { id: "R", name: "ɹ"},
  { id: "S", name: "s"},
  { id: "SH", name: "ʃ"},
  { id: "T", name: "t"},
  { id: "TH", name: "θ"},
  { id: "V", name: "v"},
  { id: "W", name: "w"},
  { id: "Y", name: "j"},
  { id: "Z", name: "Z"},
  { id: "ZH", name: "ʒ"}
];

const availableModes: ModeOption[] = [
  { id: "Word", name: "Word"},
  { id: "Sentence", name: "Sentence"},
  { id: "Intermission", name: "Intermission"},
];

const availablePositions: PositionOption[] = [
  { id: "initial", name: "Initial"},
  { id: "medial", name: "Medial"},
  { id: "final", name: "Final"},
];

const availableGradeLevels: GradeLevelOption[] = [
  { id: "0", name: "All Grade Levels"},
  { id: "7", name: "1st Grade" },
  { id: "8", name: "2nd Grade" },
  { id: "9", name: "3rd Grade" },
  { id: "10", name: "4th Grade" },
  { id: "11", name: "5th Grade" },
  { id: "12", name: "6th Grade" },
  { id: "13", name: "7th Grade" },
  { id: "14", name: "8th Grade" },
  { id: "15", name: "9th Grade" },
  { id: "16", name: "10th Grade" },
  { id: "17", name: "11th Grade" },
  { id: "18", name: "12th Grade" },
  { id: "22", name: "College" }
];

const RoutineBuilderRefactored: React.FC<RoutineBuilderProps> = (props) => {
  const theme = useTheme();
  const classes = styles(theme);
  const navigate = useNavigate();
  
  // Local state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showDescriptionEditor, setShowDescriptionEditor] = useState(true);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  
  // Refs
  const routinePreviewRef = useRef<any>(null);

  // Responsive design
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  
  let exerciseContainerWidth = 12;
  let routineBuilderContainerWidth = 12;
  
  if (isXl) {
    exerciseContainerWidth = 2;
    routineBuilderContainerWidth = 6;
  } else if (isLg) {
    exerciseContainerWidth = 4;
    routineBuilderContainerWidth = 8;
  }

  // Effects
  useEffect(() => {
    props.resetRoutineBuilder();
    if (props.user) {
      prepareRoutineBuilder();
    }
  }, []);

  useEffect(() => {
    if (props.lastUpdated && props.id !== 0) {
      saveHandler();
    }
  }, [props.lastUpdated]);

  useEffect(() => {
    if (props.id) {
      routineSelectHandler(props.id);
    }
  }, [props.id]);

  // Helper functions
  const prepareRoutineBuilder = () => {
    props.fetchUsers();
  };

  const saveHandler = () => {
    const { id, name, description, age, routine } = props;
    
    const body = {
      data: {
        id,
        attributes: {
          id,
          name,
          description: JSON.stringify(description),
          age,
          subroutine: routine
        }
      }
    };

    props.attemptUpdateRoutine(id, body);
    props.resetWordCard();
    props.resetRoutineSelect();
  };

  // Event handlers
  const handleCreateRoutine = (routineName: string) => {
    if (routineName.length > 0 && props.userId !== 0) {
      props.attemptCreateRoutine(props.userId, routineName);
    }
    if (routinePreviewRef.current) {
      routinePreviewRef.current.state.query = null;
    }
  };

  const handleDeleteRoutine = (routineId: number) => {
    if (routineId !== 0) {
      props.attemptDeleteRoutine(props.userId, routineId);
      resetStepList();
    }
    if (routinePreviewRef.current) {
      routinePreviewRef.current.state.query = null;
    }
  };

  const handlePreview = () => {
    setPreviewModalOpen(true);
    if (routinePreviewRef.current) {
      routinePreviewRef.current.refreshQuery();
    }
  };

  const handlePreviewClose = () => {
    setPreviewModalOpen(false);
  };

  const handleToggleDescriptionEditor = () => {
    setShowDescriptionEditor(!showDescriptionEditor);
  };

  // Step management handlers
  const handleStepSelect = (index: number) => {
    stepListHandler(index);
  };

  const handleInsertStep = () => {
    resetHandler();

    const initialState = {
      vowels: [],
      consonants: [],
      mode: 'Word',
      rangeVal: 5,
      repetitions: 10,
      syllables: [],
      position: 'initial',
      intermissionText: '',
      isIntermission: false,
    };

    const { vowels, consonants, mode, position, rangeVal, repetitions, syllables, intermissionText, isIntermission } = initialState;

    const step = {
      index: Date.now(),
      rangeVal,
      repetitions,
      mode,
      isIntermission,
      ...(isIntermission ? { intermissionText } : { vowels, consonants, syllables, position })
    };

    setCurrentStepIndex(step.index);
    props.insertStep(step);
  };

  const handleUpdateStep = () => {
    if (props.routine.length > 0) {
      const index = currentStepIndex;
      const routineStack = [...props.routine];
      const { vowels, consonants, mode, position, rangeVal, repetitions, syllables, intermissionText, isIntermission } = props;

      const stepIndex = routineStack.findIndex(step => step.index === index);
      if (stepIndex !== -1) {
        const step = {
          index: routineStack[stepIndex].index,
          rangeVal,
          repetitions,
          mode,
          isIntermission,
          ...(isIntermission ? { intermissionText } : { vowels, consonants, syllables, position })
        };

        routineStack[stepIndex] = step;
        props.updateStep(routineStack);
        stepListHandler(index);
      }
    }
  };

  const handleDeleteStep = () => {
    const index = currentStepIndex;

    if (index > 0 && props.routine.length > 0) {
      const depth = props.routine.findIndex(step => step.index === index);

      if (depth === props.routine.length - 1 && depth !== 0) {
        setCurrentStepIndex(props.routine[depth - 1].index);
        stepListHandler(props.routine[depth - 1].index);
      } else if (depth > 0) {
        setCurrentStepIndex(props.routine[depth + 1].index);
        stepListHandler(props.routine[depth + 1].index);
      } else if (depth === 0 && props.routine.length > 1) {
        setCurrentStepIndex(props.routine[1].index);
        stepListHandler(props.routine[1].index);
      }

      props.removeStep(index);
    }
  };

  const resetHandler = () => {
    props.resetForm();
  };

  const resetStepList = () => {
    props.resetStepList();
  };

  const stepListHandler = (index: number) => {
    if (index > 0) {
      const routine = props.routine.find(step => step.index === index);
      
      if (routine) {
        const { vowels, consonants, mode, position, rangeVal, repetitions, syllables, intermissionText, isIntermission } = routine;

        props.updateIndex(index);
        props.updateRangeVal(rangeVal);
        props.updateRepetitions(repetitions);
        props.updateMode(mode);
        props.updateIsIntermission(isIntermission);

        if (isIntermission) {
          props.updateIntermissionText(intermissionText || '');
        } else {
          props.updateVowels(vowels || []);
          props.updateConsonants(consonants || []);
          props.updateSyllables(syllables || []);
          props.updatePosition(position || 'initial');
        }

        setCurrentStepIndex(index);
        if (routinePreviewRef.current) {
          routinePreviewRef.current.state.query = null;
        }
      }
    }
  };

  const routineSelectHandler = (id: number) => {
    resetStepList();

    const selectedRoutine = props.availableRoutines.find(routine => routine.attributes.id === id);
    
    if (selectedRoutine) {
      props.updateId(selectedRoutine.attributes.id);
      props.updateName(selectedRoutine.attributes.name);
      
      try {
        props.updateDescription(JSON.parse(selectedRoutine.attributes.description));
      } catch (e) {
        // Handle parsing error
      }
      
      props.updateGradeLevel(selectedRoutine.attributes.age);

      // Process subroutines
      selectedRoutine.attributes.subroutine.forEach((subroutine: any, index: number) => {
        const { vowels, consonants, mode, position, rangeVal, repetitions, syllables, intermissionText } = subroutine;
        
        const step = {
          index: Date.now() + index,
          rangeVal,
          repetitions,
          mode,
          isIntermission: mode === "Intermission",
          ...(mode === "Intermission" ? { intermissionText } : { 
            vowels, 
            consonants, 
            syllables, 
            position: position || 'initial' 
          })
        };

        if (index === 0) {
          setCurrentStepIndex(step.index);
          props.updateIndex(step.index);
          props.updateRangeVal(step.rangeVal);
          props.updateRepetitions(step.repetitions);
          props.updateMode(step.mode);
          props.updateIsIntermission(step.isIntermission);

          if (step.isIntermission) {
            props.updateIntermissionText(step.intermissionText || '');
          } else {
            props.updateVowels(step.vowels || []);
            props.updateConsonants(step.consonants || []);
            props.updateSyllables(step.syllables || []);
            props.updatePosition(step.position || 'initial');
          }
        }

        props.insertStep(step);
      });
    }
  };

  const userSelectHandler = (id: number) => {
    const selectedUser = props.availableUsers.find(user => user.attributes.id === id);
    
    if (selectedUser) {
      props.updateUserId(selectedUser.attributes.id);
      props.fetchRoutines(selectedUser.attributes.id);
      resetStepList();
    }
  };

  // Phonetic configuration handlers
  const handleVowelChange = (vowels: string[]) => {
    const vowelIds = vowels.map(vowelName => {
      const vowel = availableVowels.find(v => v.name === vowelName);
      return vowel ? vowel.id : '';
    }).filter(id => id !== '');

    props.updateVowels(vowelIds);
    if (routinePreviewRef.current) {
      routinePreviewRef.current.state.query = null;
    }
  };

  const handleConsonantChange = (consonant: string, value: boolean) => {
    if (value) {
      props.addConsonant(consonant);
    } else {
      props.removeConsonant(consonant);
    }
    if (routinePreviewRef.current) {
      routinePreviewRef.current.state.query = null;
    }
  };

  const handleSyllableChange = (syllables: string[]) => {
    const syllableIds = syllables.map(syllableName => {
      const syllable = availableSyllables.find(s => s.name === syllableName);
      return syllable ? syllable.id : 0;
    }).filter(id => id !== 0);

    props.updateSyllables(syllableIds);
    if (routinePreviewRef.current) {
      routinePreviewRef.current.state.query = null;
    }
  };

  const handleModeChange = (mode: string) => {
    props.updateMode(mode);
    props.updateIsIntermission(mode === "Intermission");
    if (routinePreviewRef.current) {
      routinePreviewRef.current.state.query = null;
    }
  };

  const handlePositionChange = (position: string) => {
    props.updatePosition(position);
    if (routinePreviewRef.current) {
      routinePreviewRef.current.state.query = null;
    }
  };

  const handleRangeValChange = (rangeVal: number) => {
    props.updateRangeVal(rangeVal);
    if (routinePreviewRef.current) {
      routinePreviewRef.current.state.query = null;
    }
  };

  const handleRepetitionsChange = (repetitions: number) => {
    props.updateRepetitions(repetitions);
    if (routinePreviewRef.current) {
      routinePreviewRef.current.state.query = null;
    }
  };

  const handleIntermissionTextChange = (text: string) => {
    props.updateIntermissionText(text);
    if (routinePreviewRef.current) {
      routinePreviewRef.current.state.query = null;
    }
  };

  // Parse data for child components
  const parseAvailableUsers = () => {
    return props.availableUsers.map(user => ({
      id: user.attributes.id,
      name: `${user.attributes.firstName} ${user.attributes.lastName}`,
      isActive: user.attributes.isActive
    }));
  };

  const parseAvailableRoutines = () => {
    return props.availableRoutines.map(routine => ({
      id: routine.attributes.id,
      name: routine.attributes.name
    }));
  };

  const parseCurrentRoutineStep = () => {
    return props.routine.find(step => step.index === props.index) || {
      index: 0,
      rangeVal: props.rangeVal,
      repetitions: props.repetitions,
      mode: props.mode,
      isIntermission: props.isIntermission,
      vowels: props.vowels,
      consonants: props.consonants,
      syllables: props.syllables,
      position: props.position,
      intermissionText: props.intermissionText
    };
  };

  const availableUsers = parseAvailableUsers();
  const availableRoutines = parseAvailableRoutines();
  const currentRoutineStep = parseCurrentRoutineStep();
  const selectedUser = availableUsers.find(user => user.id === props.userId);
  const selectedRoutine = availableRoutines.find(routine => routine.id === props.id);

  if (!props.user) {
    return null;
  }

  return (
    <Grid className={classes.root}>
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={exerciseContainerWidth}>
          <Grid container spacing={0} justifyContent="center">
            <Grid item xs={12}>
              <Card className={classes.userAdminCard}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
                    Routine Builder
                  </Typography>
                  
                  {props.user.superuser && (
                    <>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Use the menu to select a user and routine.
                      </Typography>
                      <br />
                      <UserSelect 
                        action={userSelectHandler} 
                        options={availableUsers} 
                        user={selectedUser ? { user: selectedUser.id } : { user: '' }} 
                      />
                    </>
                  )}

                  <Grid container className={classes.routineBuilderSelectContainer}>
                    <Grid item>
                      <div className={classes.RoutineBuilderSelector}>
                        <RoutinesSelect 
                          action={routineSelectHandler} 
                          options={availableRoutines} 
                          routine={selectedRoutine ? { routine: selectedRoutine.id } : { routine: '' }} 
                        />
                      </div>
                    </Grid>
                    <Grid item>
                      <NewRoutineButton action={handleCreateRoutine} />
                    </Grid>
                    <Grid item>
                      <DeleteRoutineButton action={handleDeleteRoutine} routineId={props.id} />
                    </Grid>
                  </Grid>

                  <GradeLevelSelect 
                    gradeLevel={{ gradeLevel: props.age }}
                    options={availableGradeLevels}
                    action={props.updateGradeLevel}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={routineBuilderContainerWidth}>
          <Grid container spacing={2}>
            {/* Routine Metadata */}
            <Grid item xs={12}>
              <RoutineMetadata
                name={props.name}
                description={props.description}
                onNameChange={props.updateName}
                onDescriptionChange={props.updateDescription}
                showDescriptionEditor={showDescriptionEditor}
                onToggleDescriptionEditor={handleToggleDescriptionEditor}
              />
            </Grid>

            {/* Exercise Step List */}
            <Grid item xs={12} md={6}>
              <ExerciseStepList
                routine={props.routine}
                currentIndex={currentStepIndex}
                onStepSelect={handleStepSelect}
              />
            </Grid>

            {/* Step Editor */}
            <Grid item xs={12} md={6}>
              <StepEditor
                mode={props.mode}
                rangeVal={props.rangeVal}
                repetitions={props.repetitions}
                vowels={props.vowels}
                consonants={props.consonants}
                syllables={props.syllables}
                position={props.position}
                intermissionText={props.intermissionText}
                isIntermission={props.isIntermission}
                availableVowels={availableVowels}
                availableConsonants={availableConsonants}
                availableSyllables={availableSyllables}
                availableModes={availableModes}
                availablePositions={availablePositions}
                availableGradeLevels={availableGradeLevels}
                onModeChange={handleModeChange}
                onRangeValChange={handleRangeValChange}
                onRepetitionsChange={handleRepetitionsChange}
                onVowelChange={handleVowelChange}
                onConsonantChange={handleConsonantChange}
                onSyllableChange={handleSyllableChange}
                onPositionChange={handlePositionChange}
                onIntermissionTextChange={handleIntermissionTextChange}
                onInsertStep={handleInsertStep}
                onUpdateStep={handleUpdateStep}
                onDeleteStep={handleDeleteStep}
                onResetForm={resetHandler}
              />
            </Grid>

            {/* Routine Preview */}
            <Grid item xs={12}>
              <RoutinePreview
                routineStep={currentRoutineStep}
                onPreview={handlePreview}
                open={previewModalOpen}
                onClose={handlePreviewClose}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RoutineBuilderRefactored;