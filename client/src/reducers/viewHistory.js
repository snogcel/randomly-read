import {FETCH_VIEW_HISTORY_REQUEST} from '../actions/viewHistory';
import {FETCH_VIEW_HISTORY_SUCCESS} from '../actions/viewHistory';
import {FETCH_VIEW_HISTORY_ERROR} from '../actions/viewHistory';

let dataSet;
const initialState = {
  filter: 30,
  dataSet: [],
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIEW_HISTORY_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_VIEW_HISTORY_SUCCESS:
      return { ...state, isFetching: false, dataSet: action.viewHistory };
    case FETCH_VIEW_HISTORY_ERROR:
      return { ...state, isFetching: false };

    default:
      return state;
  }
}
