import { connect } from 'react-redux';
import { compose } from 'redux';
import Subnavigation from '../Subnavigation';

import { updateId, resetRoutineSelect } from '../../../actions/routineSelect';

const mapStateToProps = state => ({
  routineSelectId: state.routineSelect.id,
});

const mapDispatchToProps = { updateId, resetRoutineSelect };

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const SubnavigationContainer = enhance(Subnavigation);

export default SubnavigationContainer;
