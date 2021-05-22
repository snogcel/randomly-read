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

    this.state = { };

    this.fetching = false;
    this.debug = true;
  }

  componentDidMount() {
    if (this.props.mode !== "Intermission") this.props.buildGraphQL(this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    // if data has been returned from query
    if ((typeof(this.props.data) !== 'undefined' && this.props.data)) {

      const { mode, data, refetch } = this.props;

      // check if data object is empty
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        this.result = "";
        refetch();
      }

      if (mode === 'Word' && data.words) {

        // if new result, store and display
        if ((this.result !== data.words.lexeme) && this.fetching) {
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

        // if new result, store and display
        if (this.result !== result && this.fetching) {
          this.result = result; // assign newly generated sentence to result
          this.fetching = false;
          this.parseResult(mode, data);
          console.log("-storing sentence: ", data);
        }
      }

    }


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

    const { currentExercise, mode, text, vowel, classes } = this.props;

    if (text) {

      return (
        <React.Fragment key={'card'}>

          <Grid container className={classes.wordGrid} justify="center">
            <Grid item>

              <Card elevation={1} className={classes.card}>
                <CardContent>
                  { (mode === 'Intermission' ? <Intermission /> : null)}
                  { (mode === 'Word' ? <Word mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /> : null ) }
                  { (mode === 'Sentence' ? <Sentence mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /> : null ) }
                </CardContent>
              </Card>

            </Grid>
          </Grid>

        </React.Fragment>
      );

    } else {
      return null;
    }

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
    const { classes, currentExercise, currentExerciseNumber, mode, text, data, refetch } = props;

    this.fetching = true;

    // Check for empty word card
    if (currentExercise.length > 0 && currentExerciseNumber === null && text === "") {
      if (this.debug) console.log("-rendering with empty word card: ", this.props);
      return null;
    }

    // Check for paused word card
    if (currentExercise.length > 0 && currentExerciseNumber === null) {
      if (this.debug) console.log("-rendering with paused word card");
    }

    if (this.props.isPaused && text === "") {
      if (this.debug) console.log("-rendering with paused props and empty word card");
    }

    if (this.props.isPaused) {
      if (this.debug) console.log("-rendering with paused props: ", props);
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

        { ((mode === 'Word' || mode === 'Sentence') && (this.renderCard(this.formatProps(props, this.result)))) }

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
