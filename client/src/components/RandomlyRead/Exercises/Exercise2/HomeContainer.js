import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from './withDefinedAuth';

import { updateId, resetRoutineSelect } from '../../../../actions/routineSelect';

import Exercise2TimerContainer from '../TimerContainer';
import Exercise2RoutineSelectContainer from './RoutineSelectContainer';
import Exercise2Introduction from './Introduction';

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

const Exercise2HomeContainer = enhance(Home);

export {
  Exercise2HomeContainer,
  Exercise2TimerContainer,
  Exercise2RoutineSelectContainer,
  Exercise2Introduction
};
