import {INSERT_STEP} from '../actions/routineBuilder';
import {UPDATE_STEP} from '../actions/routineBuilder';
import {REMOVE_STEP} from '../actions/routineBuilder';
import {RESET_STEP_LIST} from '../actions/routineBuilder';

import {UPDATE_USER_ID} from '../actions/routineBuilder';

import {RESET} from '../actions/routineBuilder';
import {RESET_FORM} from '../actions/routineBuilder';
import {UPDATE_NAME} from '../actions/routineBuilder';
import {UPDATE_DESCRIPTION} from '../actions/routineBuilder';
import {UPDATE_ID} from '../actions/routineBuilder';
import {UPDATE_INDEX} from '../actions/routineBuilder';
import {UPDATE_VOWELS} from '../actions/routineBuilder';
import {UPDATE_CONSONANTS} from '../actions/routineBuilder';
import {ADD_CONSONANT} from '../actions/routineBuilder';
import {REMOVE_CONSONANT} from "../actions/routineBuilder";
import {UPDATE_MODE} from '../actions/routineBuilder';
import {UPDATE_RANGEVAL} from '../actions/routineBuilder';
import {UPDATE_REPETITIONS} from '../actions/routineBuilder';
import {UPDATE_SYLLABLES} from '../actions/routineBuilder';
import {UPDATE_POSITION} from '../actions/routineBuilder';
import {UPDATE_INTERMISSION_TEXT} from '../actions/routineBuilder';
import {UPDATE_IS_INTERMISSION} from '../actions/routineBuilder';

import {FETCH_ROUTINES_REQUEST} from '../actions/routineBuilder';
import {FETCH_ROUTINES_SUCCESS} from '../actions/routineBuilder';
import {FETCH_ROUTINES_ERROR} from '../actions/routineBuilder';

import {UPDATE_ROUTINE_REQUEST} from '../actions/routineBuilder';
import {UPDATE_ROUTINE_SUCCESS} from '../actions/routineBuilder';
import {UPDATE_ROUTINE_ERROR} from '../actions/routineBuilder';

import {CREATE_ROUTINE_REQUEST} from '../actions/routineBuilder';
import {CREATE_ROUTINE_SUCCESS} from '../actions/routineBuilder';
import {CREATE_ROUTINE_ERROR} from '../actions/routineBuilder';

import {DELETE_ROUTINE_REQUEST} from '../actions/routineBuilder';
import {DELETE_ROUTINE_SUCCESS} from '../actions/routineBuilder';
import {DELETE_ROUTINE_ERROR} from '../actions/routineBuilder';

import {FETCH_USERS_REQUEST} from '../actions/routineBuilder';
import {FETCH_USERS_SUCCESS} from '../actions/routineBuilder';
import {FETCH_USERS_ERROR} from '../actions/routineBuilder';

let availableRoutines;
const initialState = {
  availableUsers: [],
  userId: 0,
  availableRoutines: [],
  name: '',
  description: '',
  id: 0,
  routine: [],
  index: 0,
  vowels: [],
  consonants: [],
  mode: 'Word',
  rangeVal: 5,
  repetitions: 10,
  syllables: [],
  position: 'initial',
  intermissionText: '',
  isIntermission: false,
  lastUpdated: null,
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case CREATE_ROUTINE_REQUEST:
      return { ...state, isFetching: true };
    case CREATE_ROUTINE_SUCCESS:
      return { ...state, isFetching: false, routine: action.newRoutine.subroutine, availableRoutines: action.newRoutine.data, id: action.newRoutine.newRoutineId, name: action.newRoutine.newRoutineName };
    case CREATE_ROUTINE_ERROR:
      return { ...state, isFetching: false };

    case UPDATE_ROUTINE_REQUEST:
      return { ...state, isFetching: true };
    case UPDATE_ROUTINE_SUCCESS:
      return { ...state, isFetching: false,
        routine: action.updatedRoutine.data.attributes.subroutine,
        availableRoutines: state.availableRoutines.map(item =>
          item.id === action.updatedRoutine.data.id ? { ...availableRoutines, id: action.updatedRoutine.data.id, attributes: action.updatedRoutine.data.attributes } : item
        ),
        name: action.updatedRoutine.data.attributes.name };
    case UPDATE_ROUTINE_ERROR:
      return { ...state, isFetching: false, error: action.error };

    case DELETE_ROUTINE_REQUEST:
      return { ...state, isFetching: true };
    case DELETE_ROUTINE_SUCCESS:
      return { ...state, isFetching: false, availableRoutines: action.routines, id: initialState.id, name: initialState.name };
    case DELETE_ROUTINE_ERROR:
      return { ...state, isFetching: false };

    case FETCH_USERS_REQUEST:
      return { ...state, isFetching: true, };
    case FETCH_USERS_SUCCESS:
      return { ...state, isFetching: false, availableUsers: action.users };
    case FETCH_USERS_ERROR:
      return { ...state, isFetching: false };

    case FETCH_ROUTINES_REQUEST:
      return { ...state, isFetching: true, routine: [], newRoutine: null };
    case FETCH_ROUTINES_SUCCESS:
      return { ...state, isFetching: false, availableRoutines: action.routines };
    case FETCH_ROUTINES_ERROR:
      return { ...state, isFetching: false };

    case UPDATE_USER_ID:
      return {...state, userId: action.userId};

    case RESET:
      return { ...initialState };

    case RESET_STEP_LIST:
      return { ...initialState,
        availableRoutines: state.availableRoutines,
        availableUsers: state.availableUsers,
        userId: state.userId,
      };
    case RESET_FORM:
      return { ...initialState,
        availableRoutines: state.availableRoutines,
        availableUsers: state.availableUsers,
        userId: state.userId,
        routine: state.routine,
        name: state.name,
        description: state.description,
        id: state.id
      };
    case UPDATE_NAME:
      return {...state, lastUpdated: Date.now(), name: action.name};
    case UPDATE_DESCRIPTION:
      return {...state, lastUpdated: Date.now(), description: action.description};
    case UPDATE_ID:
      return {...state, id: action.id};
    case UPDATE_INDEX:
      return {...state, index: action.index};
    case INSERT_STEP:
      return {...state, lastUpdated: Date.now(), routine: [...state.routine, action.step]};
    case REMOVE_STEP:
      return {...state, lastUpdated: Date.now(), routine: state.routine.filter(item => action.index !== item.index)};
    case UPDATE_STEP:
      return {...state, lastUpdated: Date.now(), routine: action.routineArr};
    case UPDATE_VOWELS:
      return {...state, vowels: action.vowelArr};
    case UPDATE_CONSONANTS:
      return {...state, consonants: action.consonantArr};
    case ADD_CONSONANT:
      return {...state, consonants: [...state.consonants, action.consonant]};
    case REMOVE_CONSONANT:
      return {...state, consonants: state.consonants.filter(item => action.consonant !== item)};
    case UPDATE_MODE:
      return {...state, mode: action.mode};
    case UPDATE_RANGEVAL:
      return {...state, rangeVal: action.rangeVal};
    case UPDATE_REPETITIONS:
      return {...state, repetitions: action.repetitions};
    case UPDATE_SYLLABLES:
      return {...state, syllables: action.syllables};
    case UPDATE_POSITION:
      return {...state, position: action.position};
    case UPDATE_INTERMISSION_TEXT:
      return {...state, intermissionText: action.intermissionText};
    case UPDATE_IS_INTERMISSION:
      return {...state, isIntermission: action.isIntermission};
    default:
      return state;
  }
}
