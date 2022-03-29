import { connect } from 'react-redux';
import Identities from '../../Identities/Identities';

export default function withAuth (WrappedComponent) {

  const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
    exerciseToken: Identities[0].token,
    exerciseUser: Identities[0].user
  });

  return connect(mapStateToProps)(WrappedComponent);
}
