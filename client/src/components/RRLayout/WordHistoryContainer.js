import { connect } from 'react-redux';
import WordHistory from './WordHistory'

const mapStateToProps = state => ({
    word: state.word.text,
    currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
    });

  const mapDispatchToProps = dispatch => ({

    });

    const WordHistoryContainer = connect(
        mapStateToProps,
        mapDispatchToProps,
      )(WordHistory);
      
      export default WordHistoryContainer;