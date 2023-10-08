import { connect } from 'react-redux';
import RoutineSelect from '../../RoutineSelect';
import { fetchAssignedRoutines, updateId, updateName, updateDescription, updateActiveRoutine } from '../../../../actions/routineSelect';
import {updateTimeLeft, setInProgress } from '../../../../actions/exerciseHistory';
import {compose} from "redux";
import withAuth from './withDefinedAuth';

const mapStateToProps = state => ({
  availableRoutines: state.routineSelect.availableRoutines,
  name: state.routineSelect.name,
  description: state.routineSelect.description,
  id: state.routineSelect.id,
  routine: state.routineSelect.routine,
  isVoting: state.posts.isVoting,
  isInteractionVoting: state.interaction.isInteractionVoting,
  isFetching: state.routineSelect.isFetching,
  timeLeft: state.exerciseHistory.timeLeft,
  time: state.exerciseHistory.time,
  inProgress: state.exerciseHistory.inProgress,
  isCompleted: state.exerciseHistory.isCompleted,
  text: state.word.text,
  auto: state.modeSelect.auto
});

const mapDispatchToProps = { fetchAssignedRoutines, updateId, updateName, updateDescription, updateActiveRoutine, updateTimeLeft, setInProgress };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const RoutineSelectContainer = enhance(RoutineSelect);

export default RoutineSelectContainer;
