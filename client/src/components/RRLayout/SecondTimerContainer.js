import { connect } from 'react-redux';
import Timer from './Timer';
import {addWord} from '../../actions/word';
import {removeConsonant} from '../../actions/word';
import {setMode} from '../../actions/word';
import {addSyllables} from '../../actions/word';
import {addExercise} from '../../actions/exerciseHistory'
import {addExerciseNumber} from '../../actions/exerciseHistory'
import {setExercisePause} from '../../actions/exerciseHistory';
import {updateCompleted} from '../../actions/exerciseHistory';
import {updateTotal} from '../../actions/exerciseHistory';
import {setModalOpen} from '../../actions/exerciseHistory';
import {setRange} from '../../actions/exerciseHistory';
import {updatetimeLeft} from '../../actions/exerciseHistory';

import {addConsonant} from '../../actions/word'
import {setLimit} from '../../actions/word'
import {addRoutineVowel} from '../../actions/word';
import {setIntermissionText} from '../../actions/word';

const mapStateToProps = state => ({
  currentExercise: state.exerciseHistory.currentExercise,
  currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
  isPaused: state.exerciseHistory.isPaused,
  completed: state.exerciseHistory.completed,
  total: state.exerciseHistory.total,
  isModalOpen: state.exerciseHistory.isModalOpen
  });

const mapDispatchToProps = dispatch => ({
    addWord: (word) => {
      dispatch(addWord(word))
    },
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
    },
    setModalOpen: (bool) => {
      dispatch(setModalOpen(bool))
    },
    setRange: (value) => {
      dispatch(setRange(value))
    },
    updateCompleted: (completed) => {
      dispatch(updateCompleted(completed))
    },
    updateTotal: (total) => {
      dispatch(updateTotal(total))
    },
    updatetimeLeft: (timeLeft) => {
      dispatch(updatetimeLeft(timeLeft))
    },
    addConsonant: (consonant) => {
      dispatch(addConsonant(consonant))
    },
    setLimit: (limit) => {
      dispatch(setLimit(limit))
    },
    setIntermissionText: (text) => {
      dispatch(setIntermissionText(text))
    }
  });

const SecondTimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);

export default SecondTimerContainer;
