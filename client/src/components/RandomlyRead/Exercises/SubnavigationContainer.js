import { connect } from 'react-redux';
import { compose } from 'redux';
import Subnavigation from '../Subnavigation';

import { updateId, resetRoutineSelect } from '../../../actions/routineSelect';
import { resetWordCard } from '../../../actions/word';
import { setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults } from '../../../actions/exerciseHistory';

const mapStateToProps = state => ({
  routineSelectId: state.routineSelect.id,
});

const mapDispatchToProps = { updateId, resetRoutineSelect, resetWordCard, setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults };

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const SubnavigationContainer = enhance(Subnavigation);

export default SubnavigationContainer;
