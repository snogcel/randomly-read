import { connect } from 'react-redux';
import {addVowel} from '../../actions/word'
import {addConsonant} from '../../actions/word'
import {addSyllables} from '../../actions/word'
import {setLimit} from '../../actions/word'
import {setMode} from '../../actions/word'
import Timer from './RRComponent';
import {addRoutineVowel} from '../../actions/word';
import {setIntermissionText} from '../../actions/word';

const mapStateToProps = state => ({
    

  });

  const mapDispatchToProps = dispatch => ({
    addRoutineVowel: (vowel) => {
      dispatch(addRoutineVowel(vowel))
    },
    addConsonant: (consonant) => {
      dispatch(addConsonant(consonant))
    },
    addSyllables: (syllables) => {
        dispatch(addSyllables(syllables))
      },
    setLimit: (limit) => {
      dispatch(setLimit(limit))
    },
    setMode: (mode) => {
    dispatch(setMode(mode))
  },
  setIntermissionText: (mode) => {
    dispatch(setIntermissionText(mode))
  }

  });

  const TimerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Timer);
  
  export default TimerContainer;