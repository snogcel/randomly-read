import { connect } from 'react-redux';
import ProgressIndicator from './ProgressIndicator'

const mapStateToProps = state => ({

    currentExercise: state.exerciseHistory.currentExercise,
    currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
    isIntermission: state.exerciseHistory.isIntermission,
    completed: state.exerciseHistory.completed,
    total: state.exerciseHistory.total,
    range: state.exerciseHistory.range,
    timeLeft: state.exerciseHistory.timeLeft,
    text: state.word.text
    });

    const mapDispatchToProps = dispatch => ({

    });

    const ProgressIndicatorContainer = connect(
        mapStateToProps,
        mapDispatchToProps
      )(ProgressIndicator);

      export default ProgressIndicatorContainer;



