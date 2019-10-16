import { connect } from 'react-redux';
import WordHistory from './WordHistory'

const mapStateToProps = state => ({
  currentExercise: state.exerciseHistory.currentExercise,
  currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
  exerciseResults: state.exerciseHistory.exerciseResults
});

const mapDispatchToProps = dispatch => ({

});

const WordHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WordHistory);
      
export default WordHistoryContainer;
