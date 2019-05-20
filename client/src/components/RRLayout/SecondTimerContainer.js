import { connect } from 'react-redux';
import Timer from './Timer';
import {addRoutineVowel} from '../../actions/word';

const mapStateToProps = state => ({
 
  
  });

const mapDispatchToProps = dispatch => ({
    addRoutineVowel: (vowel) => {
      dispatch(addRoutineVowel(vowel))
    }});

    const SecondTimerContainer = connect(
        mapStateToProps,
        mapDispatchToProps
      )(Timer);
      
      export default SecondTimerContainer;