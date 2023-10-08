import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from './withDefinedAuth';

import { updateId, resetRoutineSelect } from '../../../../actions/routineSelect';

import Exercise1TimerContainer from '../TimerContainer';
import Exercise1RoutineSelectContainer from './RoutineSelectContainer';
import Exercise1Introduction from './Introduction';
import Exercise1Techniques from './Techniques';

import Home from '../../Home';

const mapStateToProps = state => ({
  routineSelectId: state.routineSelect.id,
  inProgress: state.exerciseHistory.inProgress,
  isCompleted: state.exerciseHistory.isCompleted,
  auto: state.modeSelect.auto
});

const mapDispatchToProps = { updateId, resetRoutineSelect };

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
