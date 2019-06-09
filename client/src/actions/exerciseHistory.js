export const ADD_EXERCISE = 'ADD_EXERCISE';
export const ADD_EXERCISE_NUMBER = 'ADD_EXERCISE_POINTER';
export const EXERCISE_PAUSE = 'EXERCISE_PAUSE';
export const MODAL_OPEN = 'MODAL_OPEN';
export const UPDATE_COMPLETED = 'UPDATE_COMPLETED';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const SET_RANGE = 'SET_RANGE';

export function addExercise(text) {
    return {
        type: ADD_EXERCISE, text
    }
}

export function addExerciseNumber(text) {
    return {
        type: ADD_EXERCISE_NUMBER, text
    }
}


export function setExercisePause(text) {
    return {
        type: EXERCISE_PAUSE, text
    }
}

export function updateCompleted(text) {
    return {
        type: UPDATE_COMPLETED, text
    }
}

export function updateTotal(text) {
    return {
        type: UPDATE_TOTAL, text
    }
}

export function setModalOpen(text) {
    return {
        type: MODAL_OPEN, text
    }
}

export function setRange(text) {
    return {
        type: SET_RANGE, text
    }
}









