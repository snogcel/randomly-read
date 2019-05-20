import { connect } from 'react-redux';
import Intermission from './Intermission';

const mapStateToProps = state => ({

    intermissionText: state.word.intermissionText
  
  });

  const mapDispatchToProps = dispatch => ({
  
  
  });

  const IntermissionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Intermission);
  
  export default IntermissionContainer;