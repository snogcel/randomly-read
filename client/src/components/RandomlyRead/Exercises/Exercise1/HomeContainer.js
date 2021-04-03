import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from './withDefinedAuth';
import RRHome from '../../Home'

const enhance = compose(
  withAuth
);

const RRHomeContainer = enhance(RRHome);

export default RRHomeContainer;
