import { connect } from 'react-redux';
import Definitions from './Component';
import {compose} from "redux";

const mapStateToProps = state => ({});
const mapDispatchToProps = {};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const DefinitionsContainer = enhance(Definitions);

export default DefinitionsContainer;
