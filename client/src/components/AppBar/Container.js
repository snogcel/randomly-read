import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../util/withAuth';
import { logout } from '../../actions/auth';
import AppBar from './Component';

const mapDispatchToProps = { logout };

const enhance = compose(
  withAuth,
  connect(null, mapDispatchToProps)
);

const AppBarContainer = enhance(AppBar);

export default AppBarContainer;
