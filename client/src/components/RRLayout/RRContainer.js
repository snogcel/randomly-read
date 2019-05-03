import { connect } from 'react-redux';
import RRComponent from './RRComponent';

const mapStateToProps = state => ({
  ...state,
  testVal: 'test'
});

const mapDispatchToProps = dispatch => ({
  // empty for now
});

const RRContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RRComponent);

export default RRContainer;
