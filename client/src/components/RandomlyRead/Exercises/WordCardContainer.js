import { connect } from 'react-redux';
import WordCard from '../WordCard';
import {addVowel} from '../../../actions/word'
import {addWord} from '../../../actions/word'
import {removeVowel} from '../../../actions/word'
import {removeWord} from '../../../actions/word'
import {addRoutineVowel} from '../../../actions/word'
import {buildGraphQL} from "../../../actions/word";

import {setModalOpen} from '../../../actions/exerciseHistory';
import {addQueryResult} from '../../../actions/exerciseHistory'
import {addExerciseNumber} from '../../../actions/exerciseHistory'

const mapStateToProps = state => ({
  text: state.word.text,
  vowel: state.word.vowel,
  consonant: state.word.consonant,
  position: state.word.position,
  age: state.word.age,
  syllables: state.word.syllables,
  mode: state.word.mode,
  limit: state.word.limit,
  query: state.word.query,
  currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
  currentExercise: state.exerciseHistory.currentExercise,
  completed: state.exerciseHistory.completed,
  name: state.routineSelect.name,
  description: state.routineSelect.description,
  isVoting: state.posts.isVoting,
  isInteractionVoting: state.interaction.isInteractionVoting,
  isPaused: state.exerciseHistory.isPaused,
  timeLeft: state.exerciseHistory.timeLeft,
  time: state.exerciseHistory.time,
  inProgress: state.exerciseHistory.inProgress,
  isVisible: state.exerciseHistory.isVisible,
});

const mapDispatchToProps = dispatch => ({
  addVowel: (vowel) => {
    dispatch(addVowel(vowel))
  },
  addRoutineVowel: (vowel) => {
    dispatch(addRoutineVowel(vowel))
  },
  addWord: (word) => {
    dispatch(addWord(word))
  },
  removeVowel: (vowel) => {
    dispatch(removeVowel(vowel))
  },
  removeWord: (word) => {
    dispatch(removeWord(word))
  },
  setModalOpen: (bool) => {
    dispatch(setModalOpen(bool))
  },
  addQueryResult: (word) => {
    dispatch(addQueryResult(word))
  },
  addExerciseNumber: (exerciseNum) => {
    dispatch(addExerciseNumber(exerciseNum))
  },
  buildGraphQL: (props) => {
    dispatch(buildGraphQL(props))
  }
});

const WordCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WordCard);

export default WordCardContainer;
