import {FETCH_ASSIGNED_ROUTINES_REQUEST} from '../actions/routineSelect';
import {FETCH_ASSIGNED_ROUTINES_SUCCESS} from '../actions/routineSelect';
import {FETCH_ASSIGNED_ROUTINES_ERROR} from '../actions/routineSelect';

import {UPDATE_ROUTINE_ID} from '../actions/routineSelect';
import {UPDATE_ROUTINE_NAME} from '../actions/routineSelect';
import {UPDATE_ACTIVE_ROUTINE} from '../actions/routineSelect';

let availableRoutines;
const initialState = {
  availableRoutines: [],
  routine: [],
  id: 0,
  name: '',
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCH_ASSIGNED_ROUTINES_REQUEST:
      return { ...state, isFetching: true, name: '', id: 0 };
    case FETCH_ASSIGNED_ROUTINES_SUCCESS:
      return { ...state, isFetching: false, availableRoutines: action.routines };
    case FETCH_ASSIGNED_ROUTINES_ERROR:
      return { ...state, isFetching: false };

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
