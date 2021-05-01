import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';

// import gql from 'graphql-tag';

import { gql, useQuery } from '@apollo/client';

import Intermission from '../RRLayout/IntermissionContainer';
import VowelCheckboxes from '../RRLayout/VowelCheckboxes';
import { styles } from '../../exerciseThemeHandler';

import RoutineDescription from './RoutineDescription';
import VowelCheckbox from '../RRLayout/elements/VowelCheckbox';
import Word from '../RRLayout/elements/Word';
import Sentence from '../RRLayout/elements/Sentence';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class WordCard extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      updateCard: false
    };

    this.fetching = false;
    this.debug = false;
  }

  componentDidMount() {
    if (this.props.mode !== "Intermission") this.props.buildGraphQL(this.props);
  }

  shouldComponentUpdate(nextProps) {

    // handle case: query parameter change
    if (((this.props.vowel !== nextProps.vowel) || (this.props.consonant !== nextProps.consonant)) && (nextProps.vowel !== null && nextProps.vowel.length > 0)) {
      if (nextProps.mode !== "Intermission") this.props.buildGraphQL(nextProps);
    }

    // handle case: exercise selected but not started
    if (nextProps.isPaused && nextProps.currentExerciseNumber === null) {
      if (this.debug) console.log("handle case: exercise selected but not started");
      return true;
    }

    // handle case: exercise is starting
    if ((this.props.timeLeft === nextProps.timeLeft) && (nextProps.isPaused === false) && (!this.props.consonant)) {
      if (this.debug) console.log("handle case: exercise is starting");
      return true;
    }

    // handle case: query change (Intermission will return "null")
    if ((this.props.query !== nextProps.query) && (this.props.query.action !== null) && (nextProps.query.action !== null)) {
      if (this.debug) console.log("handle case: query change");
      return true;
    }

    // handle case: card should be refreshed
    if (((this.props.timeLeft === 0) && (nextProps.timeLeft === 0))) {
      if (this.debug) console.log("handle case: card should be refreshed");
      return true;
    }

    // handle case: card text has changed
    if ((this.props.text !== nextProps.text) && !!nextProps.text && this.state.updateCard) {
      if (this.debug) console.log("handle case: card text has changed");
      this.setState({ updateCard: false });
      return true;
    }

    // handle case: currentExerciseNumber has changed
    if (this.props.currentExerciseNumber !== nextProps.currentExerciseNumber) {
      if (this.debug) console.log("handle case: currentExerciseNumber has changed");
      return true;
    }


    // handle case: timer is resuming
    if (this.props.isPaused && !nextProps.isPaused && this.props.text !== "") {
      if (this.debug) console.log("handle case: timer is resuming");
      console.log(this.props);
      return false;
    }

    // handle case: timer is paused
    if (nextProps.isPaused || this.props.isPaused) {
      if (this.debug) console.log("handle case: timer is paused");
      console.log(this.props);
      return false;
    }

    // handle case: resuming from another page
    if (this.props.isPaused && this.props.consonant) {
      if (this.debug) console.log("handle case: resuming from another page");
      return false;
    }

    // handle case: intermission
    if (this.props.mode === 'Intermission') {
      if (this.debug) console.log("handle case: intermission");
      return true;
    }

    // handle case: voting should not trigger card update
    if (nextProps.isVoting !== this.props.isVoting) {
      if (this.debug) console.log("handle case: voting should not trigger card update");
      return false;
    }

    // handle case: interaction voting should not trigger card update
    if (nextProps.isInteractionVoting !== this.props.isInteractionVoting) {
      if (this.debug) console.log("handle case: interaction voting should not trigger card update");
      return false;
    }

    // handle case: default
    return false;

  }

  renderDescription(props) {
    const { currentExercise, classes } = props;

    const formattedDuration = this.formatDuration(currentExercise);

    return (
      <React.Fragment key={'description'}>

        <Grid container>
          <Grid item xs={10} sm={12} md={11}>

            <Paper className={classes.exerciseDetails} elevation={0}>

              <Typography variant="h5" component="h2" className={classes.heading}>{this.props.name}</Typography>

              <Typography gutterBottom variant="body2" color="textSecondary" component="p">{formattedDuration}</Typography>

              <br />

              <RoutineDescription description={this.props.description} />

            </Paper>

          </Grid>
        </Grid>

        <br />

      </React.Fragment>
    )
  }

  formatProps(props, text) {
    let { currentExercise, classes } = props;

    return {
      currentExercise: currentExercise,
      classes: classes,
      text: text
    };
  }

  renderCard(props) {
    const { currentExercise, text, classes } = props;

    return (
      <React.Fragment key={'card'}>

        <Grid container className={classes.wordGrid} justify="center">
          <Grid item>

            <Card elevation={1} className={classes.card}>
              <CardContent>
                { (this.props.mode === 'Intermission' ? <Intermission /> : null)}
                { (this.props.mode === 'Sentence' ? <Sentence mode={this.props.mode} key={this.props.text} value={{name: this.props.text, selectedVowel: this.props.vowel}} /> : <Word mode={this.props.mode} key={this.props.text} value={{name: this.props.text, selectedVowel: this.props.vowel}} /> ) }
              </CardContent>
            </Card>

          </Grid>
        </Grid>

      </React.Fragment>
    );
  }

  renderError(classes) {

    return (
      <React.Fragment>
        <Grid container className={classes.wordGrid} justify="center">
          <Grid item>

            <Card elevation={1} className={classes.card}>
              <CardContent>
                <Word mode={this.props.mode} value={{name: "Error", selectedVowel: this.props.vowel}} />
              </CardContent>
            </Card>

          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  formatDuration(currentExercise) {
    let formattedDuration;

    let duration = 0;

    for (let i = 0; i < currentExercise.length; i++) {
      duration += (currentExercise[i].rangeVal * currentExercise[i].repetitions);
    }

    let minutes = Math.floor(duration / 60);

    let seconds = duration - (minutes * 60);

    if (minutes === 0) {
      formattedDuration = "Duration: " + seconds + " seconds";
    } else if (minutes === 1) {
      formattedDuration = "Duration: " + minutes + " minute and " + seconds + " seconds";
    } else {
      formattedDuration = "Duration: " + minutes + " minutes and " + seconds + " seconds";
    }

    return formattedDuration;
  }

  checkRepeat(result, prevResult) {

  }

  parseResult(mode, data, result) {

    if (mode === 'Word') {

      const { words } = data;

      let fetched = {
        id: words.id,
        wordid: words.wordid,
        title: words.lexeme,
        score: words.score,
        votes: words.votes,
        comments: [],
        type: "text",
        time: Date.now()
      };

      this.props.addWord(this.result);
      this.props.addQueryResult(fetched);

    } else if (mode === 'Sentence') {

      const { sentences } = data;

      let fetched = [];

      for (let i = 0; i < sentences.words.length; i++) {
        fetched.push({
          id: sentences.words[i].id,
          wordid: sentences.words[i].wordid,
          title: sentences.words[i].lexeme,
          score: sentences.words[i].score,
          votes: sentences.words[i].votes,
          comments: [],
          type: "text"
        })
      }

      this.props.addWord(this.result);
      this.props.addQueryResult({
        "id": null,
        "title": fetched,
        "score": null,
        "votes": null,
        "comments": [],
        "type": "sentence",
        "time": Date.now()
      });

    }

  }

  render() {
    const props = this.props;
    const { classes, currentExercise, currentExerciseNumber, mode, text } = props;

    // Check for empty word card
    if (currentExercise.length > 0 && currentExerciseNumber === null && text === "") {
      if (this.debug) console.log("-rendering with empty word card");
      return [this.renderDescription(props)];
    }

    // Check for paused word card -- TODO / review
    if (currentExercise.length > 0 && currentExerciseNumber === null) {
      if (this.debug) console.log("-rendering with paused word card");
      return [this.renderDescription(props),this.renderCard(props)];
    }

    if (this.props.isPaused && text === "") {
      if (this.debug) console.log("-rendering with paused props and empty word card");
      return [this.renderDescription(props)];
    }

    if (this.props.isPaused) {
      if (this.debug) console.log("-rendering with paused props");
      return [this.renderDescription(props),this.renderCard(props)];
    }

    if (this.state.updateCard) {
      if (this.debug) console.log("-rendering due to card update");
      this.state.updateCard = false;
      return [this.renderDescription(props),this.renderCard(props)];
    }

    // Set Query
    if (typeof(props.query) !== 'undefined' && props.query.action !== null) {
      this.query = props.query.action;
    } else {
      return null;
    }

    this.fetching = true;

    return (
      <React.Fragment>

        { this.renderDescription(props) }

        { ((mode === 'Word' || mode === 'Sentence') ?
          <Query query={this.query} fetchPolicy="no-cache" errorPolicy="all" variables={{ v: Math.random() }} onCompleted={() => { this.state.updateCard = true; }}>
            {({ loading, error, data, refetch }) => {

              if (loading) return null;

              if (error) return this.renderError(classes); // TODO - improve style?

              if (data) {

                // check if data object is empty
                if (Object.keys(data).length === 0 && data.constructor === Object) {
                  this.result = "";
                  refetch();
                }

                if (mode === 'Word' && data.words) {

                  // If duplicate, refetch
                  if (this.result === data.words.lexeme && this.fetching){
                    refetch();
                  }

                  // if new result, store and display
                  if (this.result !== data.words.lexeme && this.fetching) {
                    this.result = data.words.lexeme;
                    this.fetching = false;
                    this.parseResult(mode, data);
                    if (this.debug) console.log("-storing word: ", data);
                  }

                } else if (mode === 'Sentence' && (typeof data.sentences !== "undefined") && data.sentences.words.length > 0) {

                  // Parse Sentence Result
                  let result = "";

                  for (let i = 0; i < data.sentences.words.length; i++) {
                    result += data.sentences.words[i].lexeme;
                    if (i < (data.sentences.words.length - 1)) result += " ";
                  }

                  if (this.result === result && this.fetching){ // if repeat sentence, refetch
                    refetch();
                  }

                  if (this.result !== result && this.fetching) { // if new result, store and display
                    this.result = result; // assign newly generated sentence to result
                    this.fetching = false;
                    this.parseResult(mode, data);
                    console.log("-storing sentence: ", data);
                  }
                }
              }

              this.fetching = false;

              console.log("rendering card: ", this.result);

              if (typeof(this.result) !== 'undefined' && this.result !== null && !!this.result) {
                return (this.renderCard(this.formatProps(props, this.result)));
              }

              return null;

            }}
          </Query> : null )
        }

        { ((mode === 'Intermission') && (this.renderCard(this.formatProps(props, this.result)))) }

      </React.Fragment>

    );

  }
 }

WordCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const WordCardWrapped = withStyles(styles)(WordCard);

export default WordCardWrapped;
