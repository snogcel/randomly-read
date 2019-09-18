import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from '../../theme'; // TODO - remove
import { MuiTheme } from '../../themeHandler';
import history from '../../util/history';
import GlobalStyle from '../../globalStyle';
import HeaderContainer from '../Header/Container';
import ErrorNotificationContainer from '../ErrorNotification/Container';
import LoginFormContainer from '../LoginForm/Container';
import SignupFormContainer from '../SignupForm/Container';
import CreatePostFormContainer from '../CreatePostForm/Container';
import Home from '../Home';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import RRHomeContainer from '../RRLayout/RRHomeContainer'
import FluencyReport from '../RRFluencyReport/FluencyReport'

const client = new ApolloClient({
  uri: `http://dev.snogcel.com:8080/graphql`
});

client.defaultOptions.query = {
  fetchPolicy: "no-cache"
};

const App = props => (
  <MuiThemeProvider theme={MuiTheme}>
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
              <Route path='/RandomlyRead' component={RRHomeContainer} />
              <Route path='/FluencyReport' component={FluencyReport} />
              <Route path='/' component={Home} />
            </Switch>
          </>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </MuiThemeProvider>
);

export default App;
