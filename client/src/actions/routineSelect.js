import { getRoutines } from '../util/api';

export const FETCH_ASSIGNED_ROUTINES_REQUEST = 'FETCH_ASSIGNED_ROUTINES_REQUEST';
export const FETCH_ASSIGNED_ROUTINES_SUCCESS = 'FETCH_ASSIGNED_ROUTINES_SUCCESS';
export const FETCH_ASSIGNED_ROUTINES_ERROR = 'FETCH_ASSIGNED_ROUTINES_ERROR';

export const UPDATE_ROUTINE_ID = 'UPDATE_ROUTINE_ID';
export const UPDATE_ROUTINE_NAME = 'UPDATE_ROUTINE_NAME';
export const UPDATE_ACTIVE_ROUTINE = 'UPDATE_ACTIVE_ROUTINE';

const fetchAssignedRoutinesRequest = { type: FETCH_ASSIGNED_ROUTINES_REQUEST };
const fetchAssignedRoutinesSuccess = routines => ({ type: FETCH_ASSIGNED_ROUTINES_SUCCESS, routines });
const fetchAssignedRoutinesError = error => ({ type: FETCH_ASSIGNED_ROUTINES_ERROR, error });

export const fetchAssignedRoutines = () => async (dispatch, getState) => {
  dispatch(fetchAssignedRoutinesRequest);
  try {
    const { token } = getState().auth;
    const routines = await getRoutines(token);
    dispatch(fetchAssignedRoutinesSuccess(routines.data));
  } catch (error) {
    dispatch(fetchAssignedRoutinesError(error));
  }
};

export function updateId(id) {
  return {
    type: UPDATE_ROUTINE_ID, id
  }
}

export function updateName(name) {
  return {
    type: UPDATE_ROUTINE_NAME, name
  }
}

export function updateActiveRoutine(routine) {
  return {
    type: UPDATE_ACTIVE_ROUTINE, routine
  }
}
