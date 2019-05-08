import { connect } from 'react-redux';
import RRComponent from './RRComponent';

const mapStateToProps = state => ({
  text: state.word.text,
  vowel: state.word.vowel
  
});

const mapDispatchToProps = dispatch => ({
  // empty for now
  
});

const RRContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RRComponent);

export default RRContainer;
