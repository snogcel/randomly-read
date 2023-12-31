import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from './withDefinedAuth';

import { updateId, resetRoutineSelect } from '../../../../actions/routineSelect';
import { resetWordCard } from '../../../../actions/word';
import { setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults } from '../../../../actions/exerciseHistory';

import Exercise1TimerContainer from '../TimerContainer';
import Exercise1RoutineSelectContainer from './RoutineSelectContainer';
import Exercise1Introduction from './Introduction';
import Exercise1Techniques from './Techniques';

import Home from '../../Home';

const mapStateToProps = state => ({
  routineSelectId: state.routineSelect.id,
  inProgress: state.exerciseHistory.inProgress,
  isCompleted: state.exerciseHistory.isCompleted,
  isCompleted: state.exerciseHistory.isCompleted,
  text: state.word.text,
  auto: state.modeSelect.auto,
  pageContext: "beginner"
});

const mapDispatchToProps = { updateId, resetRoutineSelect, resetWordCard, setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const Exercise1HomeContainer = enhance(Home);

export {
  Exercise1HomeContainer,
  Exercise1TimerContainer,
  Exercise1RoutineSelectContainer,
  Exercise1Introduction,
  Exercise1Techniques
};
