import { connect } from 'react-redux';
import Identities from '../../Identities/Identities';

export default function withAuth (WrappedComponent) {

  const mapStateToProps = state => (Identities[0]);

  return connect(mapStateToProps)(WrappedComponent);
}
