import { getViewHistory } from "../util/api";

export const FETCH_VIEW_HISTORY_REQUEST = 'FETCH_VIEW_HISTORY_REQUEST';
export const FETCH_VIEW_HISTORY_SUCCESS = 'FETCH_VIEW_HISTORY_SUCCESS';
export const FETCH_VIEW_HISTORY_ERROR = 'FETCH_VIEW_HISTORY_ERROR';

const fetchViewHistoryRequest = { type: FETCH_VIEW_HISTORY_REQUEST };
const fetchViewHistorySuccess = viewHistory => ({ type: FETCH_VIEW_HISTORY_SUCCESS, viewHistory });
const fetchViewHistoryError = error => ({ type: FETCH_VIEW_HISTORY_ERROR, error });

export const fetchViewHistory = (userId) => async (dispatch, getState) => {
  dispatch(fetchViewHistoryRequest);
  try {
    const { token } = getState().auth;
    const viewHistory = await getViewHistory(userId, token);
    dispatch(fetchViewHistorySuccess(viewHistory.data));
  } catch (error) {
    dispatch(fetchViewHistoryError(error));
  }
};
