import { connect } from 'react-redux';

import Timer from './Timer';

import {addWord} from '../../actions/word';
import {removeConsonant} from '../../actions/word';
import {setMode} from '../../actions/word';
import {addSyllables} from '../../actions/word';
import {addConsonant} from '../../actions/word'
import {setPosition} from '../../actions/word';
import {setAge} from '../../actions/word';
import {setLimit} from '../../actions/word'
import {addRoutineVowel} from '../../actions/word';
import {setIntermissionText} from '../../actions/word';

import {addExercise} from '../../actions/exerciseHistory'
import {addExerciseNumber} from '../../actions/exerciseHistory'
import {setExercisePause} from '../../actions/exerciseHistory';

import {updateCompleted} from '../../actions/exerciseHistory'; // TODO - remove?
import {updateTotal} from '../../actions/exerciseHistory'; // TODO - remove?
import {setModalOpen} from '../../actions/exerciseHistory'; // TODO - remove?

import {setRange} from '../../actions/exerciseHistory';
import {updateTimeLeft} from '../../actions/exerciseHistory';

import {clearQueryResults} from '../../actions/exerciseHistory';

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
    dispatch(addRoutineVowel(vowel)) // pass through to TimerContainer
  },
  removeConsonant: () => {
    dispatch(removeConsonant())
  },
  addSyllables: (syllables) => {
    dispatch(addSyllables(syllables)) // pass through to TimerContainer
  },
  setPosition: (position) => {
    dispatch(setPosition(position)) // pass through to TimerContainer
  },
  setAge: (age) => {
    dispatch(setAge(age))
  },
  setMode: (mode) => {
    dispatch(setMode(mode)) // pass through to TimerContainer
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
  updateTimeLeft: (timeLeft) => {
    dispatch(updateTimeLeft(timeLeft))
  },
  addConsonant: (consonant) => {
    dispatch(addConsonant(consonant)) // pass through to TimerContainer
  },
  setLimit: (limit) => {
    dispatch(setLimit(limit)) // pass through to TimerContainer
  },
  setIntermissionText: (text) => {
    dispatch(setIntermissionText(text)) // pass through to TimerContainer
  },
  clearQueryResults: () => {
    dispatch(clearQueryResults())
  },
});

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);

export default TimerContainer;
