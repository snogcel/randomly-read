import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from './withDefinedAuth';

import { updateId, resetRoutineSelect } from '../../../../actions/routineSelect';
import { resetWordCard } from '../../../../actions/word';
import { setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults } from '../../../../actions/exerciseHistory';

import SplashPageTimerContainer from './SplashTimerContainer';
import SplashPageRoutineSelectContainer from './RoutineSelectContainer';
import SplashPageIntroduction from './Introduction';
import SplashPageTechniques from './Techniques';

import Home from '../../SplashHome'

const mapStateToProps = state => ({
  routineSelectId: state.routineSelect.id,
  isPaused: state.exerciseHistory.isPaused,
  inProgress: state.exerciseHistory.inProgress,
  isCompleted: state.exerciseHistory.isCompleted,
  text: state.word.text
});

const mapDispatchToProps = { updateId, resetRoutineSelect, resetWordCard, setInProgress, setExercisePause, updateTime, updateTimeLeft, clearQueryResults };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const SplashPageContainer = enhance(Home);

export {
  SplashPageContainer,
  SplashPageTimerContainer,
  SplashPageRoutineSelectContainer,
  SplashPageIntroduction,
  SplashPageTechniques
};
