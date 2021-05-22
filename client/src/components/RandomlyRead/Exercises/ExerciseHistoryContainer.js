import { connect } from 'react-redux';
import ExerciseHistory from '../ExerciseHistory';
import {addExerciseNumber} from '../../../actions/exerciseHistory'

const mapStateToProps = state => ({
    currentExercise: state.exerciseHistory.currentExercise,
    currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
    time: state.exerciseHistory.time,
    inProgress: state.exerciseHistory.inProgress,
    isCompleted: state.exerciseHistory.isCompleted,
  });

  const mapDispatchToProps = dispatch => ({
    addExerciseNumber: (exerciseNum) => {
      dispatch(addExerciseNumber(exerciseNum))
    }
  });

  const ExerciseHistoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ExerciseHistory);

  export default ExerciseHistoryContainer;
