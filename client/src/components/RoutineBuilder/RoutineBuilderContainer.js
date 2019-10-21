import { connect } from 'react-redux';
import RoutineBuilder from './RoutineBuilder';
import { updateVowels, addConsonant, removeConsonant } from '../../actions/routineBuilder';
import {compose} from "redux";
import withAuth from "../../util/withAuth";

const mapStateToProps = state => ({
  vowels: state.routineBuilder.vowels,
  consonants: state.routineBuilder.consonants,
  isFetching: state.interaction.isFetching
});

const mapDispatchToProps = { updateVowels, addConsonant, removeConsonant }; // TODO - replace with relevant actions

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const RoutineBuilderContainer = enhance(RoutineBuilder);

export default RoutineBuilderContainer;
