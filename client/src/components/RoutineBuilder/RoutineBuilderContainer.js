import { connect } from 'react-redux';
import RoutineBuilder from './RoutineBuilder';
import { updateVowels, addConsonant, removeConsonant, updateMode, updateRangeVal, updateRepetitions, updateSyllables, updatePosition, updateIntermissionText, updateIsIntermission } from '../../actions/routineBuilder';
import {compose} from "redux";
import withAuth from "../../util/withAuth";

const mapStateToProps = state => ({
  vowels: state.routineBuilder.vowels,
  consonants: state.routineBuilder.consonants,
  mode: state.routineBuilder.mode,
  rangeVal: state.routineBuilder.rangeVal,
  repetitions: state.routineBuilder.repetitions,
  syllables: state.routineBuilder.syllables,
  position: state.routineBuilder.position,
  intermissionText: state.routineBuilder.intermissionText,
  isIntermission: state.routineBuilder.isIntermission,
  isFetching: state.interaction.isFetching
});

const mapDispatchToProps = { updateVowels, addConsonant, removeConsonant, updateMode, updateRangeVal, updateRepetitions, updateSyllables, updatePosition, updateIntermissionText, updateIsIntermission }; // TODO - replace with relevant actions

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const RoutineBuilderContainer = enhance(RoutineBuilder);

export default RoutineBuilderContainer;
