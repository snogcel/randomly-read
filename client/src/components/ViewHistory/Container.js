import { connect } from 'react-redux';
// import { fetchPosts, fetchProfile } from '../../actions/posts';
import ViewHistory from './Component';

export const mapStateToProps = state => ({
  filter: state.viewHistory.filter,
  dataSet: state.viewHistory.dataSet,
  isFetching: state.viewHistory.isFetching
});

const mapDispatchToProps = { };

const ViewHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewHistory);

export default ViewHistoryContainer;
