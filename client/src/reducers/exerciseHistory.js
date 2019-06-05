import {ADD_EXERCISE} from '../actions/exerciseHistory';
import {ADD_EXERCISE_NUMBER} from '../actions/exerciseHistory';
import {EXERCISE_PAUSE} from '../actions/exerciseHistory';

const initialState = {
    currentExercise: [],
    currentExerciseNumber: null,
    isPaused: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXERCISE:
        return {...state, currentExercise: action.text}
        case ADD_EXERCISE_NUMBER:
        return {...state, currentExerciseNumber: action.text}
        case EXERCISE_PAUSE:
        return {...state, isPaused: action.text}
        default: 
        return state;
    }
}