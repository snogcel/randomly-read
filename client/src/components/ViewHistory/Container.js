import { connect } from 'react-redux';
import { fetchViewHistory, updateStartDate, updateEndDate } from '../../actions/viewHistory';
import ViewHistory from './Component';

export const mapStateToProps = state => ({
  startDate: state.viewHistory.startDate,
  endDate: state.viewHistory.endDate,
  dataSet: state.viewHistory.dataSet,
  error: state.viewHistory.error,
  isFetching: state.viewHistory.isFetching
});

const mapDispatchToProps = { fetchViewHistory, updateStartDate, updateEndDate };

const ViewHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewHistory);

export default ViewHistoryContainer;
