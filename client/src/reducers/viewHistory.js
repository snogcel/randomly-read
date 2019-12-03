import {UPDATE_START_DATE} from '../actions/viewHistory';
import {UPDATE_END_DATE} from '../actions/viewHistory';
import {UPDATE_FILTER} from '../actions/viewHistory';

import {FETCH_VIEW_HISTORY_REQUEST} from '../actions/viewHistory';
import {FETCH_VIEW_HISTORY_SUCCESS} from '../actions/viewHistory';
import {FETCH_VIEW_HISTORY_ERROR} from '../actions/viewHistory';

let dataSet;
const initialState = {
  startDate: null,
  endDate: null,
  dataSet: [],
  filter: "all",
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIEW_HISTORY_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_VIEW_HISTORY_SUCCESS:
      return { ...state, isFetching: false, dataSet: action.viewHistory.dataSet, startDate: action.viewHistory.startDate, endDate: action.viewHistory.endDate };
    case FETCH_VIEW_HISTORY_ERROR:
      return { ...state, isFetching: false };

    case UPDATE_START_DATE:
      return {...state, startDate: action.startDate };

    case UPDATE_END_DATE:
      return {...state, endDate: action.endDate };

    case UPDATE_FILTER:
      return {...state, filter: action.filter };

    default:
      return state;
  }
}
