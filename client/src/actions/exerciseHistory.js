export const ADD_EXERCISE = 'ADD_EXERCISE';
export const ADD_EXERCISE_NUMBER = 'ADD_EXERCISE_POINTER';
export const EXERCISE_PAUSE = 'EXERCISE_PAUSE';
export const MODAL_OPEN = 'MODAL_OPEN';
export const UPDATE_COMPLETED = 'UPDATE_COMPLETED';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const SET_RANGE = 'SET_RANGE';
export const UPDATE_TIMELEFT = 'UPDATE_TIMELEFT';
export const UPDATE_TIME = 'UPDATE_TIME';
export const SET_INPROGRESS = 'SET_INPROGRESS';
export const SET_ISVISIBLE = 'SET_ISVISIBLE';
export const ADD_QUERY_RESULT = 'ADD_QUERY_RESULT';
export const CLEAR_QUERY_RESULTS = 'CLEAR_QUERY_RESULTS';

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

export function updateTimeLeft(text) {
    return {
        type: UPDATE_TIMELEFT, text
    }
}

export function updateTime(text) {
  return {
    type: UPDATE_TIME, text
  }
}

export function setInProgress(text) {
  return {
    type: SET_INPROGRESS, text
  }
}

export function setIsVisible(text) {
  return {
    type: SET_ISVISIBLE, text
  }
}

export function addQueryResult(text) {
    return {
        type: ADD_QUERY_RESULT, text
    }
}

export function clearQueryResults() {
    return {
        type: CLEAR_QUERY_RESULTS
    }
}
