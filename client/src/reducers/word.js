import {ADD_VOWEL} from '../actions/word'
import {ADD_WORD} from '../actions/word'

const initialState = {
    text: [],
    vowel: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_VOWEL:
        return {...state, vowel: [...state.vowel, action.text]}
        case ADD_WORD:
        return {...state, text: action.text}
        default: 
        return state;
    }
}
