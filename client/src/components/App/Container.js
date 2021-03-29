import { connect } from 'react-redux';
import { compose } from 'redux';
import App from './Component';
import withAuth from '../../util/withAuth';

const enhance = compose(
  withAuth
);

const AppContainer = enhance(App);

export default AppContainer;

/*
const mapStateToProps = state => ({ dark: state.theme.dark });

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
*/
