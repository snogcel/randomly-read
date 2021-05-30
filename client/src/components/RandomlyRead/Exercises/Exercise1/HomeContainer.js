import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from './withDefinedAuth';

import { updateId, resetRoutineSelect } from '../../../../actions/routineSelect';

import Exercise1TimerContainer from '../TimerContainer';
import Exercise1RoutineSelectContainer from './RoutineSelectContainer';
import Exercise1Introduction from './Introduction';

import Home from '../../Home';

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

const Exercise1HomeContainer = enhance(Home);

export {
  Exercise1HomeContainer,
  Exercise1TimerContainer,
  Exercise1RoutineSelectContainer,
  Exercise1Introduction
};
