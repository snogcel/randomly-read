import {getUsers, getUser, updateUser, createUser} from "../util/api";

export const CREATE_NEW_USER = 'CREATE_NEW_USER';

export const NEW_USERNAME = 'NEW_USERNAME';
export const NEW_PASSWORD = 'NEW_PASSWORD';
export const NEW_FIRST_NAME = 'NEW_FIRST_NAME';
export const NEW_LAST_NAME = 'NEW_LAST_NAME';

export const UPDATE_USER_ID = 'UPDATE_USER_ID';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
export const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
export const UPDATE_ACTIVE = 'UPDATE_ACTIVE';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

const fetchUsersRequest = { type: FETCH_USERS_REQUEST };
const fetchUsersSuccess = users => ({ type: FETCH_USERS_SUCCESS, users });
const fetchUsersError = error => ({ type: FETCH_USERS_ERROR, error });

export const fetchUsers = () => async (dispatch, getState) => {
  dispatch(fetchUsersRequest);
  try {
    const { token } = getState().auth;
    const users = await getUsers(token);
    dispatch(fetchUsersSuccess(users.data));
  } catch (error) {
    dispatch(fetchUsersError(error));
  }
};

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const fetchUserRequest = { type: FETCH_USER_REQUEST };
const fetchUserSuccess = user => ({ type: FETCH_USER_SUCCESS, user });
const fetchUserError = error => ({ type: FETCH_USER_ERROR, error });

export const fetchUser = (userId) => async (dispatch, getState) => {
  dispatch(fetchUserRequest);
  try {
    const { token } = getState().auth;
    const user = await getUser(userId, token);
    dispatch(fetchUserSuccess(user.data));
  } catch (error) {
    dispatch(fetchUserError(error));
  }
};


export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

const updateUserRequest = { type: UPDATE_USER_REQUEST };
const updateUserSuccess = updatedUser => ({ type: UPDATE_USER_SUCCESS, updatedUser });
const updateUserError = error => ({ type: UPDATE_USER_ERROR, error });

export const attemptUpdateUser = (id, user) => async (dispatch, getState) => {
  dispatch(updateUserRequest);
  try {
    const { token } = getState().auth;
    const updatedUser = await updateUser(id, user, token);
    dispatch(updateUserSuccess(updatedUser.data));
  } catch (error) {
    dispatch(updateUserError(error));
  }
};


export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

const createUserRequest = { type: CREATE_USER_REQUEST };
const createUserSuccess = newUser => ({ type: CREATE_USER_SUCCESS, newUser });
const createUserError = error => ({ type: CREATE_USER_ERROR, error });

export const attemptCreateUser = user => async (dispatch, getState) => {
  dispatch(createUserRequest);
  try {
    const { token } = getState().auth;
    const newUser = await createUser(user, token);
    dispatch(createUserSuccess(newUser));
  } catch (error) {
    dispatch(createUserError(error));
  }
};


export function updateUserId(userId) {
  return {
    type: UPDATE_USER_ID, userId
  }
}

export function updateNewUsername(username) {
  return {
    type: NEW_USERNAME, username
  }
}

export function updateNewPassword(password) {
  return {
    type: NEW_PASSWORD, password
  }
}

export function updateNewFirstName(firstName) {
  return {
    type: NEW_FIRST_NAME, firstName
  }
}

export function updateNewLastName(lastName) {
  return {
    type: NEW_LAST_NAME, lastName
  }
}

export function updateUsername(username) {
  return {
    type: UPDATE_USERNAME, username
  }
}

export function updatePassword(password) {
  return {
    type: UPDATE_PASSWORD, password
  }
}

export function updateFirstName(firstName) {
  return {
    type: UPDATE_FIRST_NAME, firstName
  }
}

export function updateLastName(lastName) {
  return {
    type: UPDATE_LAST_NAME, lastName
  }
}

export function updateActive(active) {
  return {
    type: UPDATE_ACTIVE, active
  }
}

export function changePassword() {
  return {
    type: CHANGE_PASSWORD
  }
}

export function createNewUser() {
  return {
    type: CREATE_NEW_USER
  }
}
