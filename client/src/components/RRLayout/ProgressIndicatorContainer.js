import { connect } from 'react-redux';
import ProgressIndicator from './ProgressIndicator'

const mapStateToProps = state => ({


    currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
    isPaused: state.exerciseHistory.isPaused,
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



