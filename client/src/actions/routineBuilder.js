import { getUserRoutines, updateRoutine, createRoutine, getUsers } from '../util/api';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export const FETCH_ROUTINES_REQUEST = 'FETCH_ROUTINES_REQUEST';
export const FETCH_ROUTINES_SUCCESS = 'FETCH_ROUTINES_SUCCESS';
export const FETCH_ROUTINES_ERROR = 'FETCH_ROUTINES_ERROR';

export const UPDATE_ROUTINE_REQUEST = 'UPDATE_ROUTINE_REQUEST';
export const UPDATE_ROUTINE_SUCCESS = 'UPDATE_ROUTINE_SUCCESS';
export const UPDATE_ROUTINE_ERROR = 'UPDATE_ROUTINE_ERROR';

export const CREATE_ROUTINE_REQUEST = 'CREATE_ROUTINE_REQUEST';
export const CREATE_ROUTINE_SUCCESS = 'UPDATE_ROUTINE_SUCCESS';
export const CREATE_ROUTINE_ERROR = 'UPDATE_ROUTINE_ERROR';

export const UPDATE_USER_ID = 'UPDATE_USER_ID';

export const RESET = 'RESET';
export const RESET_STEP_LIST = 'RESET_STEP_LIST';
export const RESET_FORM = 'RESET_FORM';
export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_ID = 'UPDATE_ID';
export const UPDATE_INDEX = 'UPDATE_INDEX';
export const INSERT_STEP = 'INSERT_STEP';
export const REMOVE_STEP = 'REMOVE_STEP';
export const UPDATE_STEP = 'UPDATE_STEP';
export const UPDATE_VOWELS = 'UPDATE_VOWELS';
export const UPDATE_CONSONANTS = 'UPDATE_CONSONANTS';
export const ADD_CONSONANT = 'ADD_CONSONANT';
export const REMOVE_CONSONANT = 'REMOVE_CONSONANT';
export const UPDATE_MODE = 'UPDATE_MODE';
export const UPDATE_RANGEVAL = 'UPDATE_RANGEVAL';
export const UPDATE_REPETITIONS = 'UPDATE_REPETITIONS';
export const UPDATE_SYLLABLES = 'UPDATE_SYLLABLES';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const UPDATE_INTERMISSION_TEXT = 'UPDATE_INTERMISSION_TEXT';
export const UPDATE_IS_INTERMISSION = 'UPDATE_IS_INTERMISSION';

const fetchUsersRequest = { type: FETCH_USERS_REQUEST };
const fetchUsersSuccess = users => ({ type: FETCH_USERS_SUCCESS, users });
const fetchUsersError = error => ({ type: FETCH_USERS_ERROR, error });

export const fetchUsers = () => async (dispatch, getState) => {
  dispatch(fetchUsersRequest);
  try {
    const { token } = getState().auth;
    const users = await getUsers(token);
    dispatch(fetchUsersSuccess(users.data));
  } catch (error) {
    dispatch(fetchUsersError(error));
  }
};

const fetchRoutinesRequest = { type: FETCH_ROUTINES_REQUEST };
const fetchRoutinesSuccess = routines => ({ type: FETCH_ROUTINES_SUCCESS, routines });
const fetchRoutinesError = error => ({ type: FETCH_ROUTINES_ERROR, error });

export const fetchRoutines = (userId) => async (dispatch, getState) => {
  dispatch(fetchRoutinesRequest);
  try {
    const { token } = getState().auth;
    const routines = await getUserRoutines(userId, token);
    dispatch(fetchRoutinesSuccess(routines.data));
  } catch (error) {
    dispatch(fetchRoutinesError(error));
  }
};

const updateRoutineRequest = { type: UPDATE_ROUTINE_REQUEST };
const updateRoutineSuccess = updatedRoutine => ({ type: UPDATE_ROUTINE_SUCCESS, updatedRoutine });
const updateRoutineError = error => ({ type: UPDATE_ROUTINE_ERROR, error });

export const attemptUpdateRoutine = (id, routine) => async (dispatch, getState) => {
  dispatch(updateRoutineRequest);
  try {
    const { token } = getState().auth;
    const updatedRoutine = await updateRoutine(id, routine, token);
    dispatch(updateRoutineSuccess(updatedRoutine));
  } catch (error) {
    dispatch(updateRoutineError(error));
  }
};

const createRoutineRequest = { type: CREATE_ROUTINE_REQUEST };
const createRoutineSuccess = newRoutine => ({ type: CREATE_ROUTINE_SUCCESS, newRoutine });
const createRoutineError = error => ({ type: CREATE_ROUTINE_ERROR, error });

export const attemptCreateRoutine = (userId, routineName) => async (dispatch, getState) => {
  dispatch(createRoutineRequest);
  try {
    const { token } = getState().auth;
    const newRoutine = await createRoutine(userId, routineName, token);
    dispatch(createRoutineSuccess(newRoutine));
    return newRoutine.id;
  } catch (error) {
    dispatch(createRoutineError(error));
  }
};

export function updateUserId(userId) {
  return {
    type: UPDATE_USER_ID, userId
  }
}

export function resetRoutineBuilder() {
  return {
    type: RESET
  }
}

export function resetStepList() {
  return {
    type: RESET_STEP_LIST
  }
}

export function resetForm() {
  return {
    type: RESET_FORM
  }
}

export function updateName(name) {
  return {
    type: UPDATE_NAME, name
  }
}

export function updateId(id) {
  return {
    type: UPDATE_ID, id
  }
}

export function updateIndex(index) {
  return {
    type: UPDATE_INDEX, index
  }
}

export function insertStep(step) {
  return {
    type: INSERT_STEP, step
  }
}

export function removeStep(index) {
  return {
    type: REMOVE_STEP, index
  }
}

export function updateStep(routineArr) {
  return {
    type: UPDATE_STEP, routineArr
  }
}

export function updateVowels(vowelArr) {
  return {
    type: UPDATE_VOWELS, vowelArr
  }
}

export function updateConsonants(consonantArr) {
  return {
    type: UPDATE_CONSONANTS, consonantArr
  }
}

export function addConsonant(consonant) {
  return {
    type: ADD_CONSONANT, consonant
  }
}

export function removeConsonant(consonant) {
  return {
    type: REMOVE_CONSONANT, consonant
  }
}

export function updateMode(mode) {
  return {
    type: UPDATE_MODE, mode
  }
}

export function updateRangeVal(rangeVal) {
  return {
    type: UPDATE_RANGEVAL, rangeVal
  }
}

export function updateRepetitions(repetitions) {
  return {
    type: UPDATE_REPETITIONS, repetitions
  }
}

export function updateSyllables(syllables) {
  return {
    type: UPDATE_SYLLABLES, syllables
  }
}

export function updatePosition(position) {
  return {
    type: UPDATE_POSITION, position
  }
}

export function updateIntermissionText(intermissionText) {
  return {
    type: UPDATE_INTERMISSION_TEXT, intermissionText
  }
}

export function updateIsIntermission(isIntermission) {
  return {
    type: UPDATE_IS_INTERMISSION, isIntermission
  }
}
