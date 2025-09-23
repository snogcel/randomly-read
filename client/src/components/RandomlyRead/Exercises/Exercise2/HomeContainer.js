import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from './withDefinedAuth';

import { updateId, resetRoutineSelect } from '../../../../actions/routineSelect';
import { resetWordCard } from '../../../../actions/word';
import { setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults } from '../../../../actions/exerciseHistory';

import Exercise2TimerContainer from '../TimerContainer';
import Exercise2RoutineSelectContainer from './RoutineSelectContainer';
import Exercise2Introduction from './Introduction';
import Exercise2Techniques from './Techniques';

import Home from '../../Home'

const mapStateToProps = state => ({
  routineSelectId: state.routineSelect.id,
  isPaused: state.exerciseHistory.isPaused,
  inProgress: state.exerciseHistory.inProgress,
  isCompleted: state.exerciseHistory.isCompleted,
  text: state.word.text,
  auto: state.modeSelect.auto,
  pageContext: "intermediate"
});

const mapDispatchToProps = { updateId, resetRoutineSelect, resetWordCard, setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const Exercise2HomeContainer = enhance(Home);

export {
  Exercise2HomeContainer,
  Exercise2TimerContainer,
  Exercise2RoutineSelectContainer,
  Exercise2Introduction,
  Exercise2Techniques
};
