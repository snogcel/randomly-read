import { connect } from 'react-redux';
import { fetchViewHistory, updateStartDate, updateEndDate, updateFilter } from '../../actions/viewHistory';
import ViewHistory from './Component';

export const mapStateToProps = state => ({
  startDate: state.viewHistory.startDate,
  endDate: state.viewHistory.endDate,
  dataSet: state.viewHistory.dataSet,
  filter: state.viewHistory.filter,
  error: state.viewHistory.error,
  isFetching: state.viewHistory.isFetching
});

const mapDispatchToProps = { fetchViewHistory, updateStartDate, updateEndDate, updateFilter };

const ViewHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewHistory);

export default ViewHistoryContainer;
