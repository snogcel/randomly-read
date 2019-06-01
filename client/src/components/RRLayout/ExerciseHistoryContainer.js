import { connect } from 'react-redux';
import ExerciseHistory from './ExerciseHistory';
import {addExerciseNumber} from '../../actions/exerciseHistory'

const mapStateToProps = state => ({

    currentExercise: state.exerciseHistory.currentExercise,
    currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
    dark: state.theme.dark

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