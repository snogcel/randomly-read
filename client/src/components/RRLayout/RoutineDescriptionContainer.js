import { connect } from 'react-redux';
import RoutineDescription from './RoutineDescription';
import {compose} from "redux";
import withAuth from "../../util/withAuth";

const mapStateToProps = state => ({

  currentExercise: state.exerciseHistory.currentExercise,
  currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
  isPaused: state.exerciseHistory.isPaused,
  completed: state.exerciseHistory.completed,
  total: state.exerciseHistory.total,
  range: state.exerciseHistory.range,
  timeLeft: state.exerciseHistory.timeLeft

});

const mapDispatchToProps = dispatch => ({

});

const RoutineDescriptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineDescription);

export default RoutineDescriptionContainer;
