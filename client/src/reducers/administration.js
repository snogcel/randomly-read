import {NEW_USERNAME} from '../actions/administration';
import {NEW_PASSWORD} from '../actions/administration';
import {NEW_FIRST_NAME} from '../actions/administration';
import {NEW_LAST_NAME} from '../actions/administration';

import {UPDATE_ADMIN_USER_ID} from '../actions/administration';
import {UPDATE_USERNAME} from '../actions/administration';
import {UPDATE_FIRST_NAME} from '../actions/administration';
import {UPDATE_LAST_NAME} from '../actions/administration';
import {UPDATE_ACTIVE} from '../actions/administration';
import {UPDATE_PASSWORD} from '../actions/administration';
import {CHANGE_PASSWORD} from '../actions/administration';

import {CREATE_NEW_USER} from '../actions/administration';
import {CANCEL_CREATE_NEW_USER} from '../actions/administration';

import {FETCH_ADMIN_USERS_REQUEST} from '../actions/administration';
import {FETCH_ADMIN_USERS_SUCCESS} from '../actions/administration';
import {FETCH_ADMIN_USERS_ERROR} from '../actions/administration';

import {FETCH_USER_REQUEST} from '../actions/administration';
import {FETCH_USER_SUCCESS} from '../actions/administration';
import {FETCH_USER_ERROR} from '../actions/administration';

import {UPDATE_USER_REQUEST} from '../actions/administration';
import {UPDATE_USER_SUCCESS} from '../actions/administration';
import {UPDATE_USER_ERROR} from '../actions/administration';

import {CREATE_USER_REQUEST} from '../actions/administration';
import {CREATE_USER_SUCCESS} from '../actions/administration';
import {CREATE_USER_ERROR} from '../actions/administration';
import {LOGOUT} from "../actions/auth";

const initialState = {
  availableUsers: [],
  availableLicenses: 5,
  selectedUserId: null,
  selectedFirstName: '',
  selectedLastName: '',
  selectedUsername: '',
  selectedFocus: 'initial',
  selectedActive: false,
  selectedPassword: '',
  newUsername: '',
  newFirstName: '',
  newLastName: '',
  newPassword: '',
  mode: 'view',
  error: '',
  isFetching: false
};

let availableUsers;
export default (state = initialState, action) => {
  switch (action.type) {

    case CREATE_USER_REQUEST:
      return { ...state, isFetching: true, error: initialState.error };
    case CREATE_USER_SUCCESS:
      return { ...state,
        isFetching: false,
        availableUsers: [...state.availableUsers, action.newUser],
        selectedUserId: action.newUser.id,
        selectedUsername: action.newUser.attributes.username,
        selectedPassword: initialState.selectedPassword,
        selectedFirstName: action.newUser.attributes.firstName,
        selectedLastName: action.newUser.attributes.lastName,
        selectedActive: action.newUser.attributes.isActive,
        newUsername: initialState.newUsername,
        newFirstName: initialState.newFirstName,
        newLastName: initialState.newLastName,
        newPassword: initialState.newPassword,
        error: initialState.error,
        mode: 'view' };
    case CREATE_USER_ERROR:
      return { ...state, isFetching: false, error: action.error };

    case FETCH_ADMIN_USERS_REQUEST:
      return { ...state, isFetching: true, error: initialState.error };
    case FETCH_ADMIN_USERS_SUCCESS:
      return { ...state, isFetching: false, error: initialState.error, availableUsers: action.users };
    case FETCH_ADMIN_USERS_ERROR:
      return { ...state, isFetching: false, error: action.error };

    case FETCH_USER_REQUEST:
      return { ...state, isFetching: true, error: initialState.error };
    case FETCH_USER_SUCCESS:
      return { ...state,
        isFetching: false,
        selectedUserId: action.user.id,
        selectedUsername: action.user.attributes.username,
        selectedPassword: initialState.selectedPassword,
        selectedFirstName: action.user.attributes.firstName,
        selectedLastName: action.user.attributes.lastName,
        selectedActive: action.user.attributes.isActive,
        newUsername: initialState.newUsername,
        newFirstName: initialState.newFirstName,
        newLastName: initialState.newLastName,
        newPassword: initialState.newPassword,
        error: initialState.error,
        mode: 'view' };
    case FETCH_USER_ERROR:
      return { ...state, isFetching: false, error: action.error };

    case UPDATE_USER_REQUEST:
      return { ...state, isFetching: true, error: initialState.error };
    case UPDATE_USER_SUCCESS:
      return { ...state,
        isFetching: false,
        availableUsers: state.availableUsers.map(item =>
          item.id === action.updatedUser.id ? { ...availableUsers, id: action.updatedUser.id, attributes: action.updatedUser.attributes } : item
        ),
        selectedUserId: action.updatedUser.id,
        selectedUsername: action.updatedUser.attributes.username,
        selectedPassword: initialState.selectedPassword,
        selectedFirstName: action.updatedUser.attributes.firstName,
        selectedLastName: action.updatedUser.attributes.lastName,
        selectedActive: action.updatedUser.attributes.isActive,
        error: initialState.error,
        mode: 'view' };
    case UPDATE_USER_ERROR:
      return { ...state, isFetching: false, error: action.error };

    case CREATE_NEW_USER:
      return {...state,
        selectedUserId: initialState.selectedUserId,
        selectedUsername: initialState.selectedUsername,
        selectedFirstName: initialState.selectedFirstName,
        selectedLastName: initialState.selectedLastName,
        newUsername: initialState.newUsername,
        newFirstName: initialState.newFirstName,
        newLastName: initialState.newLastName,
        newPassword: initialState.newPassword,
        error: initialState.error,
        mode: 'create'};

    case CANCEL_CREATE_NEW_USER:
      return {...state,
        selectedUserId: initialState.selectedUserId,
        selectedUsername: initialState.selectedUsername,
        selectedFirstName: initialState.selectedFirstName,
        selectedLastName: initialState.selectedLastName,
        newUsername: initialState.newUsername,
        newFirstName: initialState.newFirstName,
        newLastName: initialState.newLastName,
        newPassword: initialState.newPassword,
        error: initialState.error,
        mode: 'view'};

    case UPDATE_ADMIN_USER_ID:
      return {...state, selectedUserId: action.userId, mode: 'view'};

    case NEW_USERNAME:
      return {...state, newUsername: action.username, mode: 'create'};

    case NEW_PASSWORD:
      return {...state, newPassword: action.password, mode: 'create'};

    case NEW_FIRST_NAME:
      return {...state, newFirstName: action.firstName, mode: 'create'};

    case NEW_LAST_NAME:
      return {...state, newLastName: action.lastName, mode: 'create'};

    case UPDATE_USERNAME:
      return {...state, selectedUsername: action.username, mode: 'edit'};

    case UPDATE_PASSWORD:
      return {...state, selectedPassword: action.password, mode: 'password'};

    case UPDATE_FIRST_NAME:
      return {...state, selectedFirstName: action.firstName, mode: 'edit'};

    case UPDATE_LAST_NAME:
      return {...state, selectedLastName: action.lastName, mode: 'edit'};

    case UPDATE_ACTIVE:
      return {...state, selectedActive: action.active, mode: 'edit'};

    case CHANGE_PASSWORD:
      return {...state, mode: 'password'};

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
