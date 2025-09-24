import React from 'react';
import { useState, useEffect } from "react";
import myGa from './myGa';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import { MuiTheme } from '../../exerciseThemeHandler';

import GlobalStyle from '../../globalStyle';
import AppBarContainer from '../AppBar/Container';
// import HeaderContainer from '../Header/Container';
import ErrorNotificationContainer from '../ErrorNotification/Container';
import LoginFormContainer from '../LoginForm/Container';
import SignupFormContainer from '../SignupForm/Container';
import CreatePostFormContainer from '../CreatePostForm/Container';

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client';

import SplashContainer from '../RandomlyRead/Splash/Container';

import Identities from '../RandomlyRead/Identities/Identities';

import { SplashPageContainer, SplashPageTimerContainer, SplashPageRoutineSelectContainer, SplashPageIntroduction, SplashPageTechniques} from '../RandomlyRead/Exercises/SplashPage/HomeContainer';
import { Exercise1HomeContainer, Exercise1TimerContainer, Exercise1RoutineSelectContainer, Exercise1Introduction, Exercise1Techniques } from '../RandomlyRead/Exercises/Exercise1/HomeContainer';
import { Exercise2HomeContainer, Exercise2TimerContainer, Exercise2RoutineSelectContainer, Exercise2Introduction, Exercise2Techniques } from '../RandomlyRead/Exercises/Exercise2/HomeContainer';
import { Exercise3HomeContainer, Exercise3TimerContainer, Exercise3RoutineSelectContainer, Exercise3Introduction, Exercise3Techniques } from '../RandomlyRead/Exercises/Exercise3/HomeContainer';

import RRHomeContainer from '../RRLayout/RRHomeContainer'
// import FluencyReport from '../RRFluencyReport/FluencyReport'
import RoutineBuilder from '../RoutineBuilder/RoutineBuilderContainer';
import Administration from '../Administration/Container';
import UserProfile from '../UserProfile/Container';

const App = (props) => {

  let {user, token, exerciseUser, exerciseToken} = props;

  let location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {

    token = null;
    user = null;

    props.setToken(user, token);

    localStorage.removeItem('token');

  }

  for (let i = 0; i < Identities.length; i++) {

    if (Identities[i].pathname.indexOf(location.pathname) !== -1) { // override

      if (token !== Identities[i].token && typeof(token) === "undefined") { // only override token if not set (not logged in)
        token = Identities[i].token;
        user = Identities[i].user;
      }

    }
  }

  const httpLink = createHttpLink({
    uri: `https://api.easyonset.com/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all'
      },
      query: {
        errorPolicy: 'all'
      }
    }
  });

  // Google Analytics
  useEffect(() => {
    myGa();
  }, []);

  return (
  <MuiThemeProvider theme={MuiTheme}>
    <ApolloProvider client={client}>
      <ThemeProvider theme={MuiTheme}>
          <div>
            <GlobalStyle />

            {/* { ((typeof(user) === "undefined") || (user === null) || (typeof(user) !== "undefined" && user.isActive)) && <Route component={AppBarContainer} /> } */}

            <ErrorNotificationContainer />
            <Routes>

              <Route path='/login' element={<LoginFormContainer />} />
              <Route path='/signup' element={<SignupFormContainer />} />
              <Route path='/createpost' element={<CreatePostFormContainer />} />
              <Route path='/RandomlyRead' element={<RRHomeContainer />} />

              
              <Route path='/RoutineBuilder' element={<RoutineBuilder />} />
              <Route path='/Administration' element={<Administration />} />
              <Route path='/Profile' element={<UserProfile />} />

              <Route              
                path="/home"
                element={<Navigate to="/" replace />}
              />

              {Identities[0].pathname.map((path, index) => (
                <Route
                  key={`identity-0-${index}`}
                  path={path}
                  element={<SplashPageContainer ApolloClient={client} TimerContainer={SplashPageTimerContainer} RoutineSelectContainer={SplashPageRoutineSelectContainer} ExerciseIntroduction={SplashPageIntroduction} ExerciseTechniques={SplashPageTechniques} />}
                />
              ))}

              {Identities[1].pathname.map((path, index) => (
                <Route
                  key={`identity-1-${index}`}
                  path={path}
                  element={<Exercise1HomeContainer ApolloClient={client} TimerContainer={Exercise1TimerContainer} RoutineSelectContainer={Exercise1RoutineSelectContainer} ExerciseIntroduction={Exercise1Introduction} ExerciseTechniques={Exercise1Techniques} />}
                />
              ))}

              {Identities[2].pathname.map((path, index) => (
                <Route
                  key={`identity-2-${index}`}
                  path={path}
                  element={<Exercise2HomeContainer ApolloClient={client} TimerContainer={Exercise2TimerContainer} RoutineSelectContainer={Exercise2RoutineSelectContainer} ExerciseIntroduction={Exercise2Introduction} ExerciseTechniques={Exercise2Techniques} />}
                />
              ))}

              {Identities[3].pathname.map((path, index) => (
                <Route
                  key={`identity-3-${index}`}
                  path={path}
                  element={<Exercise3HomeContainer ApolloClient={client} TimerContainer={Exercise3TimerContainer} RoutineSelectContainer={Exercise3RoutineSelectContainer} ExerciseIntroduction={Exercise3Introduction} ExerciseTechniques={Exercise3Techniques} />}
                />
              ))}

              <Route                
                path="/"
                element={<SplashPageContainer ApolloClient={client} TimerContainer={SplashPageTimerContainer} RoutineSelectContainer={SplashPageRoutineSelectContainer} ExerciseIntroduction={SplashPageIntroduction} ExerciseTechniques={SplashPageTechniques} />}
              />
{/* 
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              /> */}


            </Routes>
          </div>
      </ThemeProvider>
    </ApolloProvider>
  </MuiThemeProvider>
)};

export default App;
