import {UPDATE_INDEX} from '../actions/routineBuilder';

import {INSERT_STEP} from '../actions/routineBuilder';
import {UPDATE_STEP} from '../actions/routineBuilder';
import {REMOVE_STEP} from '../actions/routineBuilder';

import {UPDATE_VOWELS} from '../actions/routineBuilder';
import {UPDATE_CONSONANTS} from '../actions/routineBuilder';
import {ADD_CONSONANT} from '../actions/routineBuilder';
import {REMOVE_CONSONANT} from "../actions/routineBuilder";
import {UPDATE_MODE} from '../actions/routineBuilder';
import {UPDATE_RANGEVAL} from '../actions/routineBuilder';
import {UPDATE_REPETITIONS} from '../actions/routineBuilder';
import {UPDATE_SYLLABLES} from '../actions/routineBuilder';
import {UPDATE_POSITION} from '../actions/routineBuilder';
import {UPDATE_INTERMISSION_TEXT} from '../actions/routineBuilder';
import {UPDATE_IS_INTERMISSION} from '../actions/routineBuilder';

const initialState = {
  routine: [],
  index: 0,
  vowels: [],
  consonants: [],
  mode: 'word',
  rangeVal: 5,
  repetitions: 10,
  syllables: ["1","2","3"],
  position: 'initial',
  intermissionText: '',
  isIntermission: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INDEX:
      return {...state, index: action.index};

    case INSERT_STEP:
      return {...state, routine:  [...state.routine, action.step]};
    case REMOVE_STEP:
      return {...state, routine: state.routine.filter(item => action.index !== item.index)};
    case UPDATE_STEP:
      return {...state, routine: action.routineArr};

    case UPDATE_VOWELS:
      return {...state, vowels: action.vowelArr};
    case UPDATE_CONSONANTS:
      return {...state, consonants: action.consonantArr};
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
    case UPDATE_INTERMISSION_TEXT:
      return {...state, intermissionText: action.intermissionText};
    case UPDATE_IS_INTERMISSION:
      return {...state, isIntermission: action.isIntermission};
    default:
      return state;
  }
}
