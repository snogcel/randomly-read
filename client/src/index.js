import 'draft-js/dist/Draft.css';
import './style.css';
import './config/moment';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './util/history';
import store from './store';
import AppContainer from './components/App/Container';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router history={history}>
      <AppContainer />
    </Router>
  </Provider>
);

serviceWorker.unregister();
