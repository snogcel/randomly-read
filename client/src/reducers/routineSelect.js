import {FETCH_ASSIGNED_ROUTINES_REQUEST} from '../actions/routineSelect';
import {FETCH_ASSIGNED_ROUTINES_SUCCESS} from '../actions/routineSelect';
import {FETCH_ASSIGNED_ROUTINES_ERROR} from '../actions/routineSelect';

import {UPDATE_ROUTINE_ID} from '../actions/routineSelect';
import {UPDATE_ROUTINE_NAME} from '../actions/routineSelect';
import {UPDATE_ACTIVE_ROUTINE} from '../actions/routineSelect';

import {RESET_ROUTINE_SELECT} from '../actions/routineSelect';

let availableRoutines;
const initialState = {
  availableRoutines: [],
  routine: [],
  id: 0,
  name: '',
  isFetchingRoutines: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCH_ASSIGNED_ROUTINES_REQUEST:
      return { ...state, isFetchingRoutines: true, name: '', id: 0 };
    case FETCH_ASSIGNED_ROUTINES_SUCCESS:
      return { ...state, isFetchingRoutines: false, availableRoutines: action.routines };
    case FETCH_ASSIGNED_ROUTINES_ERROR:
      return { ...state, isFetchingRoutines: false };

    case RESET_ROUTINE_SELECT:
      return {...initialState};
    case UPDATE_ROUTINE_ID:
      return {...state, id: action.id};
    case UPDATE_ROUTINE_NAME:
      return {...state, name: action.name};
    case UPDATE_ACTIVE_ROUTINE:
      return {...state, routine: action.routine};

    default:
      return state;
  }
}
