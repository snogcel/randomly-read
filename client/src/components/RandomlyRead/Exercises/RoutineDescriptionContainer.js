import { connect } from 'react-redux';
import RoutineDescription from '../RoutineDescription';
import { updateId, updateName, updateDescription, updateActiveRoutine } from '../../../actions/routineSelect';

const mapStateToProps = state => ({
  availableRoutines: state.routineSelect.availableRoutines,
  routine: state.routineSelect.routine,
  currentExercise: state.exerciseHistory.currentExercise,
  currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
  isPaused: state.exerciseHistory.isPaused,
  inProgress: state.exerciseHistory.inProgress,
  isCompleted: state.exerciseHistory.isCompleted,
  total: state.exerciseHistory.total,
  range: state.exerciseHistory.range,
  timeLeft: state.exerciseHistory.timeLeft,
  name: state.routineSelect.name,
  description: state.routineSelect.description,
});

const mapDispatchToProps = { updateId, updateName, updateDescription, updateActiveRoutine };

const RoutineDescriptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineDescription);

export default RoutineDescriptionContainer;
