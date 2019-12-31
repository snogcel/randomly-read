import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNUP_SUCCESS, SIGNUP_ERROR, LOGOUT } from '../actions/auth';
import { CREATE_USER_ERROR } from '../actions/administration';

export default ({ dispatch }) => next => action => {
  if (action.type === LOGIN_SUCCESS || action.type === SIGNUP_SUCCESS) {
    localStorage.setItem('token', action.token);
  } else if (action.type === LOGOUT) {
    localStorage.removeItem('token');
  }

  if (action.error && (action.type !== LOGIN_ERROR && action.type !== SIGNUP_ERROR && action.type !== CREATE_USER_ERROR)) {
    dispatch({ type: LOGOUT });
  } else {
    next(action);
  }

  // next(action);
};
