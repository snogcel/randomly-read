import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from './withDefinedAuth';

import { updateId, resetRoutineSelect } from '../../../../actions/routineSelect';

import Exercise3TimerContainer from '../TimerContainer';
import Exercise3RoutineSelectContainer from './RoutineSelectContainer';
import Exercise3Introduction from './Introduction';

import Home from '../../Home'

const mapStateToProps = state => ({
  routineSelectId: state.routineSelect.id,
  inProgress: state.exerciseHistory.inProgress
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
  Exercise3Introduction
};
