import { connect } from 'react-redux';
import { fetchPosts, fetchProfile } from '../../actions/posts';
import WordHistoryList from './Component';

export const mapStateToProps = state => ({
  posts: state.exerciseHistory.exerciseResults,
  currentExercise: state.exerciseHistory.currentExercise,
  currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
  isFetching: state.posts.isFetching
});

const mapDispatchToProps = { fetchPosts, fetchProfile };

const WordHistoryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WordHistoryList);

export default WordHistoryListContainer;
