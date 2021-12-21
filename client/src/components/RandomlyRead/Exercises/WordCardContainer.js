import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { addVowel, addWord, removeVowel, removeWord, addRoutineVowel, buildGraphQL } from '../../../actions/word'
import  { setModalOpen, addQueryResult, addExerciseNumber, updateTimeLeft } from '../../../actions/exerciseHistory';

import WordCard from '../WordCard';

const mapStateToProps = state => ({
  text: state.word.text,
  vowel: state.word.vowel,
  consonant: state.word.consonant,
  position: state.word.position,
  age: state.word.age,
  syllables: state.word.syllables,
  mode: state.word.mode,
  limit: state.word.limit,
  query: state.word.query,
  currentExerciseNumber: state.exerciseHistory.currentExerciseNumber,
  currentExercise: state.exerciseHistory.currentExercise,
  exerciseResults: state.exerciseHistory.exerciseResults,
  completed: state.exerciseHistory.completed,
  name: state.routineSelect.name,
  description: state.routineSelect.description,
  isVoting: state.posts.isVoting,
  isInteractionVoting: state.interaction.isInteractionVoting,
  isPaused: state.exerciseHistory.isPaused,
  timeLeft: state.exerciseHistory.timeLeft,
  time: state.exerciseHistory.time,
  inProgress: state.exerciseHistory.inProgress,
  isCompleted: state.exerciseHistory.isCompleted,
});

const mapDispatchToProps = { addVowel, addWord, removeVowel, removeWord, addRoutineVowel, buildGraphQL, setModalOpen, addQueryResult, addExerciseNumber, updateTimeLeft };

class QueryWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.result = "";
    this.fetching = false;
    this.debug = true;

    if (this.props.mode !== "Intermission") this.props.buildGraphQL(this.props);

  }

  componentDidUpdate(prevProps) {

  }

  shouldComponentUpdate(nextProps) {

    if ((typeof(this.props.query) !== 'undefined' && this.props.query !== null)) {

      if ((JSON.stringify(this.props.query.action) !== JSON.stringify(nextProps.query.action) && !this.fetching)) {

        // handle case: query change

      } else {

        if ((this.props.timeLeft) === 0 && !this.fetching && this.props.inProgress) {

          // handle case: query result should be refreshed
          if (this.debug) console.log("handle case: card should be refreshed");

          this.fetching = true;

          return true;

        }

      }

    }

    // handle case: default
    return false;
  }

  render() {

    const props = this.props;
    const { currentExercise, currentExerciseNumber, exerciseResults, mode, text } = props;

    if (this.debug) console.log("fetching data...");

    // Check for empty word card
    if (currentExercise.length > 0 && currentExerciseNumber === null && text === "") {
      if (this.debug) console.log("-rendering with empty word card");
      return ( <WordCardContainer data={null} /> );
    }

    // Check for paused word card
    if (currentExercise.length > 0 && currentExerciseNumber === null) {
      if (this.debug) console.log("-rendering with paused word card");
      return ( <WordCardContainer data={null} /> );
    }

    if (this.props.isPaused && text === "") {
      if (this.debug) console.log("-rendering with paused props and empty word card");
      return ( <WordCardContainer data={null} /> );
    }

    if (this.props.isPaused) {
      if (this.debug) console.log("-rendering with paused props (timeLeft): ", this.props.timeLeft);
      this.fetching = false;
    }

    // Set Query
    if (typeof(props.query) !== 'undefined' && props.query.action !== null) {
      this.query = props.query.action;
    } else {
      return ( <WordCardContainer data={null} /> );
    }

    return (
      <>
        { ((typeof(this.props.query) !== "undefined" && this.props.query.action !== null && this.fetching && !this.props.isPaused) ?

          <Query
            query={this.props.query.action}
            fetchPolicy="no-cache"
            errorPolicy="all"
            variables={{ v: Math.random() }}
            onCompleted={() => {  }} >
            {({ loading, error, data, refetch }) => {

              if (loading) return ( <WordCardContainer data={null} /> );

              if (error) {

                this.fetching = false;

                return ( <WordCardContainer data={null} /> );

              }

              if (data) {

                this.fetching = false;

                /* WORD DEDUPING */

                if (mode === "Word" && typeof(data.words) !== 'undefined') {

                  let result = data.words.lexeme || "";
                  let prevResult = "";

                  if (typeof(exerciseResults) !== 'undefined' && exerciseResults.length >= 1) {
                    prevResult = exerciseResults[exerciseResults.length-1].title;
                  }

                  // If duplicate, refetch
                  if ((result === prevResult) && result !== "" && prevResult !== "" && !this.fetching){
                    if (this.debug) console.log("-refetch!");

                    if (this.debug) console.log("--current result: ", result);
                    if (this.debug) console.log("--last exercise result: ", prevResult);
                    if (this.debug) console.log("--this fetching: ", this.fetching);

                    // TODO -- implement server-side refetch
                    // refetch();
                    // this.fetching = true;

                    return ( <WordCardContainer data={data} refetch={refetch} /> );

                  } else {

                    return ( <WordCardContainer data={data} refetch={refetch} /> );

                  }

                } else if (mode === "Sentence") {

                  return ( <WordCardContainer data={data} refetch={refetch} /> );

                } else if (mode === "Intermission") {

                  return ( <WordCardContainer data={''} refetch={refetch} /> );

                } else {

                  return ( <WordCardContainer data={''} refetch={refetch} /> );

                }

              }

            }}
          </Query> : <WordCardContainer data={''} /> ) }

      </>
    )

  }

}


const WordCardWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryWrapper);

const WordCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WordCard);

export default WordCardWrapped;
