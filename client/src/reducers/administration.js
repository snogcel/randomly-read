import {UPDATE_USER_ID} from '../actions/administration';
import {UPDATE_USERNAME} from '../actions/administration';
import {UPDATE_FIRST_NAME} from '../actions/administration';
import {UPDATE_LAST_NAME} from '../actions/administration';
import {UPDATE_ACTIVE} from '../actions/administration';
import {CHANGE_PASSWORD} from '../actions/administration';

import {FETCH_USERS_REQUEST} from '../actions/administration';
import {FETCH_USERS_SUCCESS} from '../actions/administration';
import {FETCH_USERS_ERROR} from '../actions/administration';

import {FETCH_USER_REQUEST} from '../actions/administration';
import {FETCH_USER_SUCCESS} from '../actions/administration';
import {FETCH_USER_ERROR} from '../actions/administration';

const initialState = {
  availableUsers: [],
  availableLicenses: 5,
  selectedUserId: null,
  selectedFirstName: '',
  selectedLastName: '',
  selectedUsername: '',
  selectedFocus: 'initial',
  selectedActive: false,
  changePassword: '',
  changePasswordConfirm: '',
  mode: 'view',
  errors: [],
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCH_USERS_REQUEST:
      return { ...state, isFetching: true, };
    case FETCH_USERS_SUCCESS:
      return { ...state, isFetching: false, availableUsers: action.users };
    case FETCH_USERS_ERROR:
      return { ...state, isFetching: false };

    case FETCH_USER_REQUEST:
      return { ...state, isFetching: true, };
    case FETCH_USER_SUCCESS:
      return { ...state,
        isFetching: false,
        selectedUserId: action.user.id,
        selectedUsername: action.user.attributes.username,
        selectedFirstName: action.user.attributes.firstName,
        selectedLastName: action.user.attributes.lastName,
        selectedActive: action.user.attributes.isActive,
        mode: 'view' };
    case FETCH_USER_ERROR:
      return { ...state, isFetching: false };

    case UPDATE_USER_ID:
      return {...state, selectedUserId: action.userId, mode: 'view'};

    case UPDATE_USERNAME:
      return {...state, selectedUsername: action.username, mode: 'edit'};

    case UPDATE_FIRST_NAME:
      return {...state, selectedFirstName: action.firstName, mode: 'edit'};

    case UPDATE_LAST_NAME:
      return {...state, selectedLastName: action.lastName, mode: 'edit'};

    case UPDATE_ACTIVE:
      return {...state, selectedActive: action.active, mode: 'edit'};

    case CHANGE_PASSWORD:
      return {...state, mode: 'password'};

    default:
      return state;
  }
}
