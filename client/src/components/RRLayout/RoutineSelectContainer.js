import { connect } from 'react-redux';
import RoutineSelect from './RoutineSelect';
import { fetchAssignedRoutines, updateId, updateName, updateActiveRoutine } from '../../actions/routineSelect';
import {compose} from "redux";
import withAuth from "../../util/withAuth";

const mapStateToProps = state => ({
  availableRoutines: state.routineSelect.availableRoutines,
  name: state.routineSelect.name,
  id: state.routineSelect.id,
  routine: state.routineSelect.routine,
  isFetching: state.routineSelect.isFetching
});

const mapDispatchToProps = { fetchAssignedRoutines, updateId, updateName, updateActiveRoutine }; // TODO - replace with relevant actions

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const RoutineSelectContainer = enhance(RoutineSelect);

export default RoutineSelectContainer;
