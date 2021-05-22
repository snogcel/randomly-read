import {ADD_EXERCISE} from '../actions/exerciseHistory';
import {ADD_EXERCISE_NUMBER} from '../actions/exerciseHistory';
import {EXERCISE_PAUSE} from '../actions/exerciseHistory';
import {UPDATE_COMPLETED} from '../actions/exerciseHistory';
import {UPDATE_TOTAL} from '../actions/exerciseHistory';
import {MODAL_OPEN} from '../actions/exerciseHistory';
import {SET_RANGE} from '../actions/exerciseHistory';
import {UPDATE_TIMELEFT} from '../actions/exerciseHistory';
import {UPDATE_TIME} from '../actions/exerciseHistory';
import {SET_INPROGRESS} from '../actions/exerciseHistory';
import {SET_ISCOMPLETED} from '../actions/exerciseHistory';
import {ADD_QUERY_RESULT} from '../actions/exerciseHistory';
import {CLEAR_QUERY_RESULTS} from '../actions/exerciseHistory';
import {LOGOUT} from "../actions/auth";

const initialState = {
    currentExercise: [],
    currentExerciseNumber: null,
    exerciseResults: [],
    isPaused: true,
    inProgress: false,
    isCompleted: false,
    isModalOpen: null,
    range: 0,
    completed: 0,
    total: 0,
    timeLeft: null,
    time: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
      case ADD_EXERCISE:
        return {...state, currentExercise: action.text};
      case ADD_EXERCISE_NUMBER:
        return {...state, currentExerciseNumber: action.text};
      case ADD_QUERY_RESULT:
        return {...state, exerciseResults: [...state.exerciseResults, action.text]};
      case CLEAR_QUERY_RESULTS:
        return {...state, exerciseResults: []};
      case EXERCISE_PAUSE:
        return {...state, isPaused: action.text};
      case MODAL_OPEN:
        return {...state, isModalOpen: action.text};
      case SET_RANGE:
        return {...state, range: action.text};
      case UPDATE_COMPLETED:
        return {...state, completed: action.text};
      case UPDATE_TOTAL:
        return {...state, total: action.text};
      case UPDATE_TIMELEFT:
        return {...state, timeLeft: action.text};
      case UPDATE_TIME:
        return {...state, time: action.text};
      case SET_INPROGRESS:
        return {...state, inProgress: action.text};
      case SET_ISCOMPLETED:
        return {...state, isCompleted: action.text};

      case LOGOUT:
        return initialState;

      default:
        return state;
    }
}
