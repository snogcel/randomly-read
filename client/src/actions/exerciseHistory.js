export const ADD_EXERCISE = 'ADD_EXERCISE';
export const ADD_EXERCISE_NUMBER = 'ADD_EXERCISE_POINTER';

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