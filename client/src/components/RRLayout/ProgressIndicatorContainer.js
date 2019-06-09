import { connect } from 'react-redux';
import ProgressIndicator from './ProgressIndicator'

const mapStateToProps = state => ({

    currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
    dark: state.theme.dark,
    isPaused: state.exerciseHistory.isPaused,
    isModalOpen: state.exerciseHistory.isModalOpen,
    range: state.exerciseHistory.range,
    completed: state.exerciseHistory.completed,
    total: state.exerciseHistory.total,
    timeLeft: state.exerciseHistory.timeLeft
    });

    const mapDispatchToProps = dispatch => ({

    });

    const ProgressIndicatorContainer = connect(
        mapStateToProps,
        mapDispatchToProps
      )(ProgressIndicator);

      export default ProgressIndicatorContainer;



