import { compose } from 'redux';
import withAuth from '../../util/withAuth';
import RRHome from './RRHome'

const enhance = compose(
  withAuth
);

const RRHomeContainer = enhance(RRHome);

export default RRHomeContainer;
