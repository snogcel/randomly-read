import React from 'react';
import ReactGA from 'react-ga';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../../theme'; // TODO - remove
import { MuiTheme } from '../../themeHandler';
import history from '../../util/history';

import GlobalStyle from '../../globalStyle';
import AppBarContainer from '../AppBar/Container';
import HeaderContainer from '../Header/Container';
import ErrorNotificationContainer from '../ErrorNotification/Container';

import LoginFormContainer from '../LoginForm/Container';
import SignupFormContainer from '../SignupForm/Container';
import CreatePostFormContainer from '../CreatePostForm/Container';

import Home from '../Home';

import ApolloClient from 'apollo-client';

import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache as Cache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';




import RRHomeContainer from '../RRLayout/RRHomeContainer'
import RRHomeDevContainer from '../RRLayout/RRHomeContainerDev'
import FluencyReport from '../RRFluencyReport/FluencyReport'
// import Interactions from '../Interactions/InteractionsHomeContainer';
import RoutineBuilder from '../RoutineBuilder/RoutineBuilderContainer';
import Administration from '../Administration/Container';
import UserProfile from '../UserProfile/Container';
import UserHome from '../UserHome/Container';

const App = props => {

  const {user, token} = props;

  const AuthLink = (operation, next) => {

    operation.setContext(context => ({
      ...context,
      headers: {
        ...context.headers,
        Authorization: `Bearer ${token}`,
      },
    }));

    return next(operation);
  };

  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://dev.snogcel.com:8080/graphql'
      : `https://api.stuttered.net/graphql`;

  const link = ApolloLink.from([
    AuthLink,
    new HttpLink({ uri: baseUrl }),
  ]);

  const client = new ApolloClient({
    link,
    cache: new Cache().restore({}),
  });

  // Google Analytics
  ReactGA.initialize('UA-109552567-1');
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
  <MuiThemeProvider theme={MuiTheme}>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme(props.dark)}>
        <Router history={history}>
          <div>
            <GlobalStyle />
            <Route component={AppBarContainer} />
            <Route component={ErrorNotificationContainer} />
            <Switch>
              <Route path='/login' component={LoginFormContainer} />
              <Route path='/signup' component={SignupFormContainer} />
              <Route path='/createpost' component={CreatePostFormContainer} />
              <Route path='/RandomlyRead' component={RRHomeContainer} />
              <Route path='/RandomlyReadDev' component={RRHomeDevContainer} />
              <Route path='/FluencyReport' component={FluencyReport} />
              <Route path='/RoutineBuilder' component={RoutineBuilder} />
              <Route path='/Administration' component={Administration} />
              <Route path='/Profile' component={UserProfile} />
              <Route path='/' component={RRHomeContainer} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </MuiThemeProvider>
)};

export default App;
