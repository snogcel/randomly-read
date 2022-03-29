import { connect } from 'react-redux';
import Identities from '../../Identities/Identities';

export default function withAuth (WrappedComponent) {

  const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
    exerciseToken: Identities[3].token,
    exerciseUser: Identities[3].user
  });

  return connect(mapStateToProps)(WrappedComponent);
}
