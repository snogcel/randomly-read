import { connect } from 'react-redux';

import Timer from './RRComponent';
// import Timer from './Timer';

import {addConsonant} from '../../actions/word'
import {addSyllables} from '../../actions/word'
import {setLimit} from '../../actions/word'
import {setMode} from '../../actions/word'
import {addRoutineVowel} from '../../actions/word';
import {setIntermissionText} from '../../actions/word';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  addRoutineVowel: (vowel) => {
    console.log("addRoutineVowel: ", vowel);
    dispatch(addRoutineVowel(vowel))
  },
  addConsonant: (consonant) => {
    console.log("addConsonant: ", consonant);
    dispatch(addConsonant(consonant))
  },
  addSyllables: (syllables) => {
    console.log("addSyllables: ", syllables);
    dispatch(addSyllables(syllables))
  },
  setLimit: (limit) => {
    console.log("setLimit: ", limit);
    dispatch(setLimit(limit))
  },
  setMode: (mode) => {
    console.log("setMode: ", mode);
    dispatch(setMode(mode))
  },
  setIntermissionText: (text) => {
    console.log("setIntermissionText: ", text);
    dispatch(setIntermissionText(text))
  }
});

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);

export default TimerContainer;
