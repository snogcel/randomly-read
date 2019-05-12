import { connect } from 'react-redux';
import WordCard from './WordCard';
import {addVowel} from '../../actions/word'
import {addWord} from '../../actions/word'
import {removeVowel} from '../../actions/word'
import {removeWord} from '../../actions/word'

const mapStateToProps = state => ({
  text: state.text,
  vowel: state.vowel

});

const mapDispatchToProps = dispatch => ({
  addVowel: (vowel) => {
    dispatch(addVowel(vowel))
  },
  addWord: (word) => {
    dispatch(addWord(word))
  },
  removeVowel: (vowel) => {
    dispatch(removeVowel(vowel))
  },
removeWord: (word) => {
  dispatch(removeWord(word))
}

});

const RRContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WordCard);

export default RRContainer;
