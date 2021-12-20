import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from './withDefinedAuth';

import { updateId, resetRoutineSelect } from '../../../../actions/routineSelect';

import SplashPageTimerContainer from '../TimerContainer';
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

const mapDispatchToProps = { updateId, resetRoutineSelect };

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
