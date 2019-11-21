import { connect } from 'react-redux';
import { fetchViewHistory } from '../../actions/viewHistory';
import ViewHistory from './Component';

export const mapStateToProps = state => ({
  filter: state.viewHistory.filter,
  dataSet: state.viewHistory.dataSet,
  isFetching: state.viewHistory.isFetching
});

const mapDispatchToProps = { fetchViewHistory };

const ViewHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewHistory);

export default ViewHistoryContainer;
