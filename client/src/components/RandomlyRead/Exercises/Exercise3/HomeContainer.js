import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from './withDefinedAuth';

import { updateId, resetRoutineSelect } from '../../../../actions/routineSelect';

import Exercise3TimerContainer from '../TimerContainer';
import Exercise3RoutineSelectContainer from './RoutineSelectContainer';
import Exercise3Introduction from './Introduction';
import Exercise3Techniques from './Techniques';

import Home from '../../Home'

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

const Exercise3HomeContainer = enhance(Home);

export {
  Exercise3HomeContainer,
  Exercise3TimerContainer,
  Exercise3RoutineSelectContainer,
  Exercise3Introduction,
  Exercise3Techniques
};
