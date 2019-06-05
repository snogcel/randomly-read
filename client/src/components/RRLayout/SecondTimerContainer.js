import { connect } from 'react-redux';
import Timer from './Timer';
import {addRoutineVowel} from '../../actions/word';
import {removeConsonant} from '../../actions/word';
import {setMode} from '../../actions/word';
import {addSyllables} from '../../actions/word';
import {addExercise} from '../../actions/exerciseHistory'
import {addExerciseNumber} from '../../actions/exerciseHistory'
import {setExercisePause} from '../../actions/exerciseHistory';

const mapStateToProps = state => ({
  
  currentExercise: state.exerciseHistory.currentExercise,
  currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
  dark: state.theme.dark,
  isPaused: state.exerciseHistory.isPaused

  });

const mapDispatchToProps = dispatch => ({
    addRoutineVowel: (vowel) => {
      dispatch(addRoutineVowel(vowel))
    },
    removeConsonant: () => {
      dispatch(removeConsonant())
    },
    addSyllables: (syllables) => {
      dispatch(addSyllables(syllables))
    },
    setMode: (mode) => {
      dispatch(setMode(mode))
    },
    addExercise: (exercise) => {
      dispatch(addExercise(exercise))
    },
    addExerciseNumber: (exerciseNum) => {
      dispatch(addExerciseNumber(exerciseNum))
    },
    setExercisePause: (pause) => {
      dispatch(setExercisePause(pause))
    }
  });

    const SecondTimerContainer = connect(
        mapStateToProps,
        mapDispatchToProps
      )(Timer);
      
      export default SecondTimerContainer;