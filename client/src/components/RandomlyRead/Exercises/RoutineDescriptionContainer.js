import { connect } from 'react-redux';
import RoutineDescription from '../RoutineDescription';
import { updateId, updateName, updateDescription, updateActiveRoutine } from '../../../actions/routineSelect';
import { clearQueryResults } from '../../../actions/exerciseHistory';
import { updateCompleted } from '../../../actions/exerciseHistory';
import { updateTime, updateTimeLeft } from '../../../actions/exerciseHistory';
import { setExercisePause } from '../../../actions/exerciseHistory';

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
  time: state.exerciseHistory.time,
  timeLeft: state.exerciseHistory.timeLeft,
  name: state.routineSelect.name,
  description: state.routineSelect.description,
});

const mapDispatchToProps = { updateId, updateName, updateDescription, updateActiveRoutine, clearQueryResults, updateCompleted, updateTime, updateTimeLeft, setExercisePause };

const RoutineDescriptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineDescription);

export default RoutineDescriptionContainer;
