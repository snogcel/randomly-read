import { SELECT_SITE_MODE } from '../actions/modeSelect';

export default () => next => action => {
  if (action.type === SELECT_SITE_MODE) {    
    localStorage.setItem('mode', parseInt(action.mode));
  }
  next(action);
};
