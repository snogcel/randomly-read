import {ADD_VOWEL} from '../actions/word'
import {ADD_WORD} from '../actions/word'
import {REMOVE_VOWEL} from '../actions/word';
import {REMOVE_WORD} from '../actions/word';

const initialState = {
    text: [],
    vowel: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_VOWEL:
        return {...state, vowel: state.vowel.concat([action.text])}
        case ADD_WORD:
        return {...state, text: action.text}
        case REMOVE_VOWEL:
        return {...state, vowel: state.vowel.filter(val => val !== action.text)}
        case REMOVE_WORD:
        return {...state, text: null}
        default: 
        return state;
    }
}
