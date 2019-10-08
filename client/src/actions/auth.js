import { login, signup, getRoutineSettings, getInteractionSettings } from '../util/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const loginRequest = { type: LOGIN_REQUEST };
const loginSuccess = token => ({ type: LOGIN_SUCCESS, token });
const loginError = error => ({ type: LOGIN_ERROR, error });

export const attemptLogin = (username, password) => async dispatch => {
  dispatch(loginRequest);
  try {
    const token = await login(username, password);
    console.log("User Token: ", token);

    // Fetch User Routines Settings
    const routineData = await getRoutineSettings(); // store in localStorage
    let routines = [];
    for (let i = 0; i < routineData.data.length; i++) {
      routines.push(routineData.data[i].attributes);
    }
    console.log("Fetched Routines: ", JSON.stringify(routines));
    localStorage.setItem('routines', JSON.stringify(routines));

    // Fetch User Routines Settings
    const interactionSettings = await getInteractionSettings();
    let settings = [];
    for (let i = 0; i < interactionSettings.data.length; i++) {
      settings.push(interactionSettings.data[i].attributes);
    }
    console.log("Fetched Interaction Settings: ", JSON.stringify(settings));
    localStorage.setItem('interactionSettings', JSON.stringify(settings));


    // Fetch User Interaction Settings

    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginError(error));
  }
};

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

const signupRequest = { type: SIGNUP_REQUEST };
const signupSuccess = token => ({ type: SIGNUP_SUCCESS, token });
const signupError = error => ({ type: SIGNUP_ERROR, error });

export const attemptSignup = (username, password, firstName, lastName, address, city, stateProvince, postalCode, country, gender, age) => async dispatch => {
  dispatch(signupRequest);
  try {
    const token = await signup(username, password, firstName, lastName, address, city, stateProvince, postalCode, country, gender, age);
    dispatch(signupSuccess(token));
  } catch (error) {
    dispatch(signupError(error));
  }
};

export const LOGOUT = 'LOGOUT';
export const logout = () => ({ type: LOGOUT });
