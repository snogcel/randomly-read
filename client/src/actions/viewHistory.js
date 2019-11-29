import { getViewHistory } from "../util/api";

export const UPDATE_START_DATE = 'UPDATE_START_DATE';
export const UPDATE_END_DATE = 'UPDATE_END_DATE';

export const FETCH_VIEW_HISTORY_REQUEST = 'FETCH_VIEW_HISTORY_REQUEST';
export const FETCH_VIEW_HISTORY_SUCCESS = 'FETCH_VIEW_HISTORY_SUCCESS';
export const FETCH_VIEW_HISTORY_ERROR = 'FETCH_VIEW_HISTORY_ERROR';

const fetchViewHistoryRequest = { type: FETCH_VIEW_HISTORY_REQUEST };
const fetchViewHistorySuccess = viewHistory => ({ type: FETCH_VIEW_HISTORY_SUCCESS, viewHistory });
const fetchViewHistoryError = error => ({ type: FETCH_VIEW_HISTORY_ERROR, error });

export const fetchViewHistory = (userId, startDate, endDate) => async (dispatch, getState) => {
  dispatch(fetchViewHistoryRequest);
  try {
    const { token } = getState().auth;
    let viewHistory = await getViewHistory(userId, startDate, endDate, token);
    dispatch(fetchViewHistorySuccess(viewHistory.data));
  } catch (error) {
    dispatch(fetchViewHistoryError(error));
  }
};

export function updateStartDate(startDate) {
  return {
    type: UPDATE_START_DATE, startDate
  }
}

export function updateEndDate(endDate) {
  return {
    type: UPDATE_END_DATE, endDate
  }
}
