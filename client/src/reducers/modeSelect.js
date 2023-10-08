import { SELECT_SITE_MODE } from '../actions/modeSelect';

const mode = localStorage.getItem('mode') || 0;
const initialState = { mode: mode };

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SITE_MODE:
      return { ...state, mode: action.mode };
    default:
      return state;
  }
};
