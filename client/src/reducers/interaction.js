import {
  FETCH_INTERACTION_SETTINGS_REQUEST,
  FETCH_INTERACTION_SETTINGS_SUCCESS,
  FETCH_INTERACTION_SETTINGS_ERROR,
  FETCH_INTERACTIONS_REQUEST,
  FETCH_INTERACTIONS_SUCCESS,
  FETCH_INTERACTIONS_ERROR,
  CREATE_INTERACTION_REQUEST,
  CREATE_INTERACTION_SUCCESS,
  CREATE_INTERACTION_ERROR,
  DELETE_INTERACTION_REQUEST,
  DELETE_INTERACTION_SUCCESS,
  DELETE_INTERACTION_ERROR
} from '../actions/interaction';

const initialState = { isFetching: false, settings: [], items: [] };

let items;
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INTERACTIONS_REQUEST:
      return { ...state, isFetching: true, newInteraction: null };
    case FETCH_INTERACTIONS_SUCCESS:
      return { ...state, isFetching: false, items: action.interactions };
    case FETCH_INTERACTIONS_ERROR:
      return { ...state, isFetching: false };

    case FETCH_INTERACTION_SETTINGS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_INTERACTION_SETTINGS_SUCCESS:
      return { ...state, isFetching: false, settings: action.interactionSettings };
    case FETCH_INTERACTION_SETTINGS_ERROR:
      return { ...state, isFetching: false };

    case CREATE_INTERACTION_REQUEST:
      return { ...state, isFetching: true };
    case CREATE_INTERACTION_SUCCESS:
      return { ...state, isFetching: false, newInteraction: action.interaction };
    case CREATE_INTERACTION_ERROR:
      return { ...state, isFetching: false, error: action.error };

    case DELETE_INTERACTION_REQUEST:
      return { ...state, isDeleting: true };
    case DELETE_INTERACTION_SUCCESS:
      items = state.items.filter(i => i.id !== action.interaction);
      return { ...state, isDeleting: false, items, post: null };
    case DELETE_INTERACTION_ERROR:
      return { ...state, isDeleting: false };

    default:
      return state;
  }
};
