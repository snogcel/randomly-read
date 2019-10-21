import {UPDATE_VOWELS} from '../actions/routineBuilder';
import {ADD_CONSONANT} from '../actions/routineBuilder';
import {REMOVE_CONSONANT} from "../actions/routineBuilder";
import {UPDATE_MODE} from '../actions/routineBuilder';
import {UPDATE_RANGEVAL} from '../actions/routineBuilder';
import {UPDATE_REPETITIONS} from '../actions/routineBuilder';
import {UPDATE_SYLLABLES} from '../actions/routineBuilder';
import {UPDATE_POSITION} from '../actions/routineBuilder';

const initialState = {
  vowels: [],
  consonants: [],
  mode: '',
  rangeVal: 5,
  repetitions: 5,
  syllables: [],
  position: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VOWELS:
      return {...state, vowels: action.vowelArr};
    case ADD_CONSONANT:
      return {...state, consonants:  [...state.consonants, action.consonant]};
    case REMOVE_CONSONANT:
      return {...state, consonants: state.consonants.filter(item => action.consonant !== item)};
    case UPDATE_MODE:
      return {...state, mode: action.mode};
    case UPDATE_RANGEVAL:
      return {...state, rangeVal: action.rangeVal};
    case UPDATE_REPETITIONS:
      return {...state, repetitions: action.repetitions};
    case UPDATE_SYLLABLES:
      return {...state, syllables: action.syllables};
    case UPDATE_POSITION:
      return {...state, position: action.position};
    default:
      return state;
  }
}
