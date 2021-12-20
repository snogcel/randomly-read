import React from 'react';
import ReactGA from 'react-ga';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles'

import { MuiTheme } from '../../exerciseThemeHandler';

import GlobalStyle from '../../globalStyle';
import AppBarContainer from '../AppBar/Container';
// import HeaderContainer from '../Header/Container';
import ErrorNotificationContainer from '../ErrorNotification/Container';
import LoginFormContainer from '../LoginForm/Container';
import SignupFormContainer from '../SignupForm/Container';
import CreatePostFormContainer from '../CreatePostForm/Container';

import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache as Cache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import SplashContainer from '../RandomlyRead/Splash/Container';

import Identities from '../RandomlyRead/Identities/Identities';

import { SplashPageContainer, SplashPageTimerContainer, SplashPageRoutineSelectContainer, SplashPageIntroduction, SplashPageTechniques} from '../RandomlyRead/Exercises/SplashPage/HomeContainer';
import { Exercise1HomeContainer, Exercise1TimerContainer, Exercise1RoutineSelectContainer, Exercise1Introduction, Exercise1Techniques } from '../RandomlyRead/Exercises/Exercise1/HomeContainer';
import { Exercise2HomeContainer, Exercise2TimerContainer, Exercise2RoutineSelectContainer, Exercise2Introduction, Exercise2Techniques } from '../RandomlyRead/Exercises/Exercise2/HomeContainer';
import { Exercise3HomeContainer, Exercise3TimerContainer, Exercise3RoutineSelectContainer, Exercise3Introduction, Exercise3Techniques } from '../RandomlyRead/Exercises/Exercise3/HomeContainer';

import RRHomeContainer from '../RRLayout/RRHomeContainer'
import FluencyReport from '../RRFluencyReport/FluencyReport'
import RoutineBuilder from '../RoutineBuilder/RoutineBuilderContainer';
import Administration from '../Administration/Container';
import UserProfile from '../UserProfile/Container';

const App = (props) => {

  let {user, token} = props;

  let location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {

    token = null;
    user = null;

    props.setToken(user, token);

    localStorage.removeItem('token');

  }

  for (let i = 0; i < Identities.length; i++) {

    if (Identities[i].pathname.indexOf(location.pathname) !== -1) { // override

      if (token !== Identities[i].token) {
        token = Identities[i].token;
        user = Identities[i].user;
      }

    }
  }

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
      <ThemeProvider theme={MuiTheme}>
          <div>
            <GlobalStyle />

            { ((typeof(user) === "undefined") || (user === null) || (typeof(user) !== "undefined" && user.isActive)) && <Route component={AppBarContainer} /> }

            <Route component={ErrorNotificationContainer} />
            <Switch>



              <Route path='/login' component={LoginFormContainer} />
              <Route path='/signup' component={SignupFormContainer} />
              <Route path='/createpost' component={CreatePostFormContainer} />
              <Route path='/RandomlyRead' component={RRHomeContainer} />

              <Route
                path={Identities[0].pathname}
                render={props => (<SplashPageContainer ApolloClient={client} TimerContainer={SplashPageTimerContainer} RoutineSelectContainer={SplashPageRoutineSelectContainer} ExerciseIntroduction={SplashPageIntroduction} ExerciseTechniques={SplashPageTechniques} {...props}/>)}
              />

              <Route
                path={Identities[1].pathname}
                render={props => (<Exercise1HomeContainer ApolloClient={client} TimerContainer={Exercise1TimerContainer} RoutineSelectContainer={Exercise1RoutineSelectContainer} ExerciseIntroduction={Exercise1Introduction} ExerciseTechniques={Exercise1Techniques} {...props}/>)}
              />

              <Route
                path={Identities[2].pathname}
                render={props => (<Exercise2HomeContainer ApolloClient={client} TimerContainer={Exercise2TimerContainer} RoutineSelectContainer={Exercise2RoutineSelectContainer} ExerciseIntroduction={Exercise2Introduction} ExerciseTechniques={Exercise2Techniques} {...props}/>)}
              />

              <Route
                path={Identities[3].pathname}
                render={props => (<Exercise3HomeContainer ApolloClient={client} TimerContainer={Exercise3TimerContainer} RoutineSelectContainer={Exercise3RoutineSelectContainer} ExerciseIntroduction={Exercise3Introduction} ExerciseTechniques={Exercise3Techniques} {...props}/>)}
              />

              <Route path='/FluencyReport' component={FluencyReport} />
              <Route path='/RoutineBuilder' component={RoutineBuilder} />
              <Route path='/Administration' component={Administration} />
              <Route path='/Profile' component={UserProfile} />

              <Route
                exact
                path="*"
                render={() => {
                  return (
                    <Redirect to="/home" />
                  )
                }}
              />
              
            </Switch>
          </div>
      </ThemeProvider>
    </ApolloProvider>
  </MuiThemeProvider>
)};

export default App;
