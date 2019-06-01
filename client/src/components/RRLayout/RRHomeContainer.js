import { connect } from 'react-redux';
import RRHome from './RRHome'

const mapStateToProps = state => ({ dark: state.theme.dark });

const RRHomeContainer = connect(mapStateToProps)(RRHome);

export default RRHomeContainer;
