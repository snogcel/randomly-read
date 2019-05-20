import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch } from 'react-router-dom';
import theme from '../../theme';
import history from '../../util/history';
import GlobalStyle from '../../globalStyle';
import HeaderContainer from '../Header/Container';
import ErrorNotificationContainer from '../ErrorNotification/Container';
import LoginFormContainer from '../LoginForm/Container';
import SignupFormContainer from '../SignupForm/Container';
import CreatePostFormContainer from '../CreatePostForm/Container';
import Home from '../Home';
import WordCardContainer from '../RRLayout/WordCardContainer';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import TimerContainer from '../RRLayout/TimerContainer'
import WordCardHome from '../RRLayout/WordCardHome'

const client = new ApolloClient({
  uri: `https://api.stuttered.net/graphql`
});

const App = props => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme(props.dark)}>
      <Router history={history}>
        <>
          <GlobalStyle />
          <Route component={HeaderContainer} />
          <Route component={ErrorNotificationContainer} />
          <Switch>
            <Route path='/login' component={LoginFormContainer} />
            <Route path='/signup' component={SignupFormContainer} />
            <Route path='/createpost' component={CreatePostFormContainer} />
            <Route path='/RandomlyRead' component={WordCardHome} />
            <Route path='/' component={Home} />
          </Switch>
        </>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
