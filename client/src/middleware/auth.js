import { LOGIN_SUCCESS, SIGNUP_SUCCESS, LOGOUT } from '../actions/auth';

export default ({ dispatch }) => next => action => {
  if (action.type === LOGIN_SUCCESS || action.type === SIGNUP_SUCCESS) {
    localStorage.setItem('token', action.token);
  } else if (action.type === LOGOUT) {
    localStorage.removeItem('token');
  }

  if (action.error) {
    dispatch({ type: LOGOUT });
  } else {
    next(action);
  }

};
