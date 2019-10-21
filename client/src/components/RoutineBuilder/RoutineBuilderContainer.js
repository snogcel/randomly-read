import { connect } from 'react-redux';
import RoutineBuilder from './RoutineBuilder';
import { attemptCreateInteraction, attemptDeleteInteraction, fetchInteractions, fetchInteractionSettings } from '../../actions/interaction';
import {compose} from "redux";
import withAuth from "../../util/withAuth";

const mapStateToProps = state => ({
  isFetching: state.interaction.isFetching
});

const mapDispatchToProps = { attemptCreateInteraction, attemptDeleteInteraction, fetchInteractions, fetchInteractionSettings }; // TODO - replace with relevant actions

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const RoutineBuilderContainer = enhance(RoutineBuilder);

export default RoutineBuilderContainer;
