import 'draft-js/dist/Draft.css';
import './style.css';
import './config/moment';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './util/history';
import store from './store';
import AppContainer from './components/App/Container';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
