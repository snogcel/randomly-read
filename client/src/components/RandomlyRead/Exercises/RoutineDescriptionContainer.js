import { connect } from 'react-redux';
import RoutineDescription from '../RoutineDescription';

const mapStateToProps = state => ({
  currentExercise: state.exerciseHistory.currentExercise,
  currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
  isPaused: state.exerciseHistory.isPaused,
  completed: state.exerciseHistory.completed,
  total: state.exerciseHistory.total,
  range: state.exerciseHistory.range,
  timeLeft: state.exerciseHistory.timeLeft,
  name: state.routineSelect.name,
  description: state.routineSelect.description,
});

const mapDispatchToProps = dispatch => ({ });

const RoutineDescriptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineDescription);

export default RoutineDescriptionContainer;
