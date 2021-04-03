import { connect } from 'react-redux';
import { compose } from 'redux';
import App from './Component';
import { setToken } from '../../actions/auth';
import withAuth from '../../util/withAuth';

const mapStateToProps = state => ({});

const mapDispatchToProps = { setToken };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const AppContainer = enhance(App);

export default AppContainer;

/*
const mapStateToProps = state => ({ dark: state.theme.dark });

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
*/
