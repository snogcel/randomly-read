import { connect } from 'react-redux';
import Identities from '../../Identities/Identities';

export default function withAuth (WrappedComponent) {

  const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
    exerciseToken: Identities[2].token,
    exerciseUser: Identities[2].user
  });

  return connect(mapStateToProps)(WrappedComponent);
}
