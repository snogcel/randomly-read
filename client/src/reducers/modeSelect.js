import { SELECT_SITE_MODE, SELECT_TIMER_MODE } from '../actions/modeSelect';

const mode = localStorage.getItem('mode') || 0;
const initialState = { mode: mode, auto: true };

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SITE_MODE:
      return { ...state, mode: action.mode };
    case SELECT_TIMER_MODE:
      return { ...state, auto: action.auto };
    default:
      return state;
  }
};
