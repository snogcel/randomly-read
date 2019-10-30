import {RESET_WORD_CARD} from '../actions/word';
import {ADD_VOWEL} from '../actions/word'
import {ADD_WORD} from '../actions/word'
import {REMOVE_VOWEL} from '../actions/word';
import {REMOVE_WORD} from '../actions/word';
import {ADD_CONSONANT} from '../actions/word';
import {SET_LIMIT} from '../actions/word';
import {SET_MODE} from '../actions/word';
import {ADD_SYLLABLES} from '../actions/word';
import {ADD_ROUTINE_VOWEL} from '../actions/word';
import {ADD_INTERMISSION_TEXT} from '../actions/word';
import {REMOVE_CONSONANT} from '../actions/word';

const initialState = {
    text: [],
    vowel: null,
    consonant: null,
    syllables: [1],
    limit: 1,
    mode: "Word",
    intermissionText: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_WORD_CARD:
          return {...initialState};
        case ADD_VOWEL:
          return {...state, vowel: !Array.isArray(state.vowel) ? action.text : [...new Set([...state.vowel].concat(action.text))]}; //vowel: state.vowel.concat([action.text])}
        case ADD_ROUTINE_VOWEL:
          return {...state, vowel: action.text};
        case ADD_WORD:
          return {...state, text: action.text};
        case REMOVE_VOWEL:
          return {...state, vowel: !Array.isArray(state.vowel) ? null : state.vowel.filter(val => val !== action.text)};
        case REMOVE_WORD:
          return {...state, text: null};
        case ADD_CONSONANT:
          return {...state, consonant: action.text}; //state.consonant.concat([action.text])}
        case REMOVE_CONSONANT:
          return {...state, consonant: initialState.consonant};
        case ADD_SYLLABLES:
          return {...state, syllables: !Array.isArray(state.syllables) ? action.text : action.text.map(Number)}; //state.syllables.concat([parseInt(action.integer)])}
        case SET_LIMIT:
          return {...state, limit: action.text};
        case SET_MODE:
          return {...state, mode: action.text};
        case ADD_INTERMISSION_TEXT:
          return {...state, intermissionText: action.text};
        default:
          return state;
    }
}
