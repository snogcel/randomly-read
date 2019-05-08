import './style.css';
import './config/moment';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppContainer from './components/App/Container';
import * as serviceWorker from './serviceWorker';
import {addWord} from './actions/word'
import {addVowel} from './actions/word'

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

console.log(store.getState())
const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(addWord('Test Word'))
store.dispatch(addVowel('o'))
store.dispatch(addVowel('a'))
unsubscribe()

serviceWorker.unregister();
