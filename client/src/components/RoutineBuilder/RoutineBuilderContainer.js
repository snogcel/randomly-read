import { connect } from 'react-redux';
import RoutineBuilder from './RoutineBuilder';
import { resetRoutineBuilder, fetchRoutines, attemptUpdateRoutine, attemptCreateRoutine, attemptDeleteRoutine, fetchUsers, updateUserId, resetStepList, resetForm, updateName, updateId, updateVowels, updateConsonants, addConsonant, removeConsonant, updateMode, updateRangeVal, updateRepetitions, updateSyllables, updatePosition, updateIntermissionText, updateIsIntermission, updateIndex, insertStep, removeStep, updateStep } from '../../actions/routineBuilder';
import { resetRoutineSelect } from '../../actions/routineSelect';
import { resetWordCard } from "../../actions/word";

import {compose} from "redux";
import withAuth from "../../util/withAuth";

const mapStateToProps = state => ({
  availableUsers: state.routineBuilder.availableUsers,
  userId: state.routineBuilder.userId,
  availableRoutines: state.routineBuilder.availableRoutines,
  name: state.routineBuilder.name,
  id: state.routineBuilder.id,
  routine: state.routineBuilder.routine,
  index: state.routineBuilder.index,
  vowels: state.routineBuilder.vowels,
  consonants: state.routineBuilder.consonants,
  mode: state.routineBuilder.mode,
  rangeVal: state.routineBuilder.rangeVal,
  repetitions: state.routineBuilder.repetitions,
  syllables: state.routineBuilder.syllables,
  position: state.routineBuilder.position,
  intermissionText: state.routineBuilder.intermissionText,
  isIntermission: state.routineBuilder.isIntermission,
  lastUpdated: state.routineBuilder.lastUpdated,
  isFetching: state.routineBuilder.isFetching,
  isFetchingRoutines: state.routineSelect.isFetchingRoutines
});

const mapDispatchToProps = { resetRoutineBuilder, resetRoutineSelect, resetWordCard, fetchRoutines, attemptUpdateRoutine, attemptCreateRoutine, attemptDeleteRoutine, fetchUsers, updateUserId, resetStepList, resetForm, updateName, updateId, updateVowels, updateConsonants, addConsonant, removeConsonant, updateMode, updateRangeVal, updateRepetitions, updateSyllables, updatePosition, updateIntermissionText, updateIsIntermission, updateIndex, insertStep, removeStep, updateStep }; // TODO - replace with relevant actions

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const RoutineBuilderContainer = enhance(RoutineBuilder);

export default RoutineBuilderContainer;
