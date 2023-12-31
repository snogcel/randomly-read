import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from './withDefinedAuth';

import { updateId, resetRoutineSelect } from '../../../../actions/routineSelect';
import { resetWordCard } from '../../../../actions/word';
import { setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults } from '../../../../actions/exerciseHistory';

import Exercise3TimerContainer from '../TimerContainer';
import Exercise3RoutineSelectContainer from './RoutineSelectContainer';
import Exercise3Introduction from './Introduction';
import Exercise3Techniques from './Techniques';

import Home from '../../Home'

const mapStateToProps = state => ({
  routineSelectId: state.routineSelect.id,
  isPaused: state.exerciseHistory.isPaused,
  inProgress: state.exerciseHistory.inProgress,
  isCompleted: state.exerciseHistory.isCompleted,
  text: state.word.text,
  auto: state.modeSelect.auto,
  pageContext: "advanced"
});

const mapDispatchToProps = { updateId, resetRoutineSelect, resetWordCard, setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const Exercise3HomeContainer = enhance(Home);

export {
  Exercise3HomeContainer,
  Exercise3TimerContainer,
  Exercise3RoutineSelectContainer,
  Exercise3Introduction,
  Exercise3Techniques
};
