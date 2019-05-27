import { connect } from 'react-redux';
import Timer from './Timer';
import {addRoutineVowel} from '../../actions/word';
import {removeConsonant} from '../../actions/word';
import {setMode} from '../../actions/word';
import {addSyllables} from '../../actions/word';

const mapStateToProps = state => ({
 
  
  });

const mapDispatchToProps = dispatch => ({
    addRoutineVowel: (vowel) => {
      dispatch(addRoutineVowel(vowel))
    },
    removeConsonant: () => {
      dispatch(removeConsonant())
    },
    addSyllables: (syllables) => {
      dispatch(addSyllables(syllables))
    },
    setMode: (mode) => {
      dispatch(setMode(mode))
    }
  });

    const SecondTimerContainer = connect(
        mapStateToProps,
        mapDispatchToProps
      )(Timer);
      
      export default SecondTimerContainer;