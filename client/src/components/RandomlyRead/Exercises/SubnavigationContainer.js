import { connect } from 'react-redux';
import { compose } from 'redux';
// import Subnavigation from '../Subnavigation';

import { updateId, resetRoutineSelect } from '../../../actions/routineSelect';
import { resetWordCard } from '../../../actions/word';
import { selectSiteMode } from '../../../actions/modeSelect'
import { setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults } from '../../../actions/exerciseHistory';

const mapStateToProps = state => ({
  routineSelectId: state.routineSelect.id,
  mode: state.modeSelect.mode,
  currentExercise: state.exerciseHistory.currentExercise,
  currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
  time: state.exerciseHistory.time,
  inProgress: state.exerciseHistory.inProgress,
  isCompleted: state.exerciseHistory.isCompleted
});

const mapDispatchToProps = { updateId, resetRoutineSelect, resetWordCard, setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults, selectSiteMode };

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const SubnavigationContainer = enhance(Subnavigation);

export default SubnavigationContainer;
