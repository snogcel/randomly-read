import { connect } from 'react-redux';
import InteractionsHome from './InteractionsHome';
import { attemptCreateInteraction, attemptDeleteInteraction, fetchInteractions, fetchInteractionSettings } from '../../actions/interaction';
import {compose} from "redux";
import withAuth from "../../util/withAuth";

const mapStateToProps = state => ({
  settings: state.interaction.settings,
  interactions: state.interaction.items,
  isFetching: state.interaction.isFetching,
  isInteractionVoting: state.interaction.isInteractionVoting,
  isVoting: state.posts.isVoting,
  currentExerciseNumber: state.exerciseHistory.currentExerciseNumber
});

const mapDispatchToProps = { attemptCreateInteraction, attemptDeleteInteraction, fetchInteractions, fetchInteractionSettings };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const InteractionsHomeContainer = enhance(InteractionsHome);

export default InteractionsHomeContainer;
