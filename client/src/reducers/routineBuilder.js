import {UPDATE_VOWELS} from '../actions/routineBuilder';
import {ADD_CONSONANT} from '../actions/routineBuilder';
import {REMOVE_CONSONANT} from "../actions/routineBuilder";

// UPDATE_CONSONANTS

const initialState = {
  vowels: [],
  consonants: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VOWELS:
      return {...state, vowels: action.vowelArr};
    case ADD_CONSONANT:
      return {...state, consonants:  [...state.consonants, action.consonant]};
    case REMOVE_CONSONANT:
      return {...state, consonants: state.consonants.filter(item => action.consonant !== item)};
    default:
      return state;
  }
}
