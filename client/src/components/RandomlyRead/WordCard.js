import React from 'react';
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
import gql from 'graphql-tag';
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
      open: false,
      buttonColor: 'White'
    };

    this.refreshQuery = this.refreshQuery.bind(this);
    this.fetching = false;
  }

  componentDidMount() {
    window.scrollTo(0, 0); // solves case of registration from splash page / scroll
  }

  refreshQuery() {
    if (this.refresh) this.refresh();
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.props.setModalOpen(true)
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.setModalOpen(false)
  };

  handleChange = name => {

      console.log("-state change-");
      console.log("-fetching:", this.fetching);

      this.props.addRoutineVowel([name]);
      this.refreshQuery();

      // TODO - determine if query should be refreshed

   };

  setWord(word, definitions) {
    let obj = {word: word, definitions: definitions};

    console.log("- set word ? -");

    this.props.addWord(obj);
  }

  shouldComponentUpdate(nextProps) {

    console.log(this.props);

    console.log(nextProps);

    console.log("this isPaused: ", this.props.isPaused);
    console.log("next isPaused: ", nextProps.isPaused);

    // console.log("next currentExerciseNumber: ", nextProps.currentExerciseNumber);

    console.log("this timeLeft: ", this.props.timeLeft);
    console.log("next timeLeft: ", nextProps.timeLeft);


    // handle case: exercise selected but not started
    if (nextProps.isPaused && nextProps.currentExerciseNumber === null) {
      console.log("handle case: exercise selected but not started");
      return true;
    }


    // handle case: exercise is starting
    if ((this.props.timeLeft === nextProps.timeLeft) && (nextProps.isPaused === false) && (!this.props.consonant)) {
      console.log("handle case: exercise is starting");
      return true;
    }


    // handle case: timer is resuming
    if (this.props.isPaused && !nextProps.isPaused) {
      console.log("handle case: timer is resuming");
      return false;
    }


    // handle case: timer is paused
    if (nextProps.isPaused || this.props.isPaused) {
      console.log("handle case: timer is paused");
      return false;
    }


    // handle case: resuming from another page
    if (this.props.isPaused && this.props.consonant) {
      console.log("handle case: resuming from another page");
      return false;
    }


    // handle case: intermission
    if (this.props.mode === 'Intermission') {
      console.log("handle case: intermission");
      return true;
    }


    // handle case: card should be refreshed
    if (this.props.timeLeft === 0 && nextProps.timeLeft === 0) {
      console.log("handle case: card should be refreshed");
      return true;
    }


    // handle case: voting should not trigger card update
    if (nextProps.isVoting !== this.props.isVoting) {
      console.log("handle case: voting should not trigger card update");
      return false;
    }

    // handle case: interaction voting should not trigger card update
    if (nextProps.isInteractionVoting !== this.props.isInteractionVoting) {
      console.log("handle case: interaction voting should not trigger card update");
      return false;
    }


    // handle case: default
    console.log("handle case: default");
    return false;

  }

  buildQuery() {

    console.log("-build query-");

    let vowel = JSON.stringify(this.props.vowel);
    let consonant = JSON.stringify(this.props.consonant);
    let syllables = JSON.stringify(this.props.syllables);
    let limit = parseInt(this.props.limit);

    let position = JSON.stringify(this.props.position);
    let age = JSON.stringify(this.props.age);

    switch(this.props.mode) {
        case 'Sentence':
            if (this.props.consonant.length > 0 && this.props.vowel.length > 0) {
                return gql`
                {
                    sentences(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          wordid
                          lexeme
                        }                       
                    }
                }
                `;
            } else if (this.props.consonant.length > 0 && !this.props.vowel.length > 0) {
              return gql`
                {
                    sentences(consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          wordid
                          lexeme
                        }                       
                    }
                }
                `;
            } else if (!this.props.consonant.length > 0 && this.props.vowel.length > 0) {
              return gql`
                {
                    sentences(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          wordid
                          lexeme
                        }                       
                    }
                }
                `;
            } else {
                return gql`
                {
                    sentences(syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          wordid
                          lexeme
                        }
                    }
                }
                `;
            }

        case 'Word':
            if (this.props.consonant.length > 0 && this.props.vowel.length > 0) {
                return gql`
                {
                    words(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        wordid
                        lexeme                        
                    }
                }
                `;
            } else if (this.props.consonant.length > 0 && !this.props.vowel.length > 0) {
              return gql`
                {
                    words(consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        wordid
                        lexeme                        
                    }
                }
                `;
            } else if (!this.props.consonant.length > 0 && this.props.vowel.length > 0) {
              return gql`
                {
                    words(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        wordid
                        lexeme                        
                    }
                }
                `;
            } else {
                return gql`
                {
                    words(syllables: ${syllables}, limit: ${limit}, position: ${position}, age: ${age}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        wordid
                        lexeme                        
                    }
                }
                `;
            }

        default:
            console.log("No Query...");
            return null;
    }

  }

  checkRefresh(oldQuery, newQuery) {

    let refresh = false;

    function difference(lastProps, newProps) {
      let newSet = new Set(newProps);
      return lastProps.filter(function(x) { return !newSet.has(x); });
    }

    if (refresh) {
      this.refresh();
    }

  }

  getCard(text, classes) {

    console.log("generating card: ", text);

    let formattedDuration;

    let duration = 0;

    for (let i = 0; i < this.props.currentExercise.length; i++) {
      duration += (this.props.currentExercise[i].rangeVal * this.props.currentExercise[i].repetitions);
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

    return (
      <React.Fragment>

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

        <Grid container className={classes.wordGrid} justify="center">
          <Grid item>

            <Card elevation={1} className={classes.card}>
              <CardContent>
                { (this.props.mode === 'Intermission' ? <Intermission /> : '')}
                { (this.props.mode === 'Sentence' ? <Sentence value={{name: this.props.text, selectedVowel: this.props.vowel}} /> : <Word value={{name: this.props.text, selectedVowel: this.props.vowel}} /> ) }
              </CardContent>
            </Card>

          </Grid>
        </Grid>

      </React.Fragment>
    )

  }

  render() {
    const { classes } = this.props;

    let formattedDuration;

    let duration = 0;

    for (let i = 0; i < this.props.currentExercise.length; i++) {
      duration += (this.props.currentExercise[i].rangeVal * this.props.currentExercise[i].repetitions);
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

    if (this.props.currentExercise.length > 0 && this.props.currentExerciseNumber === null) {

    // calculate and format routine duration

      return (
        <React.Fragment>
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
        </React.Fragment>
      )

    }

    if (this.props.vowel === null || this.props.consonant === null) return null;

    this.query = this.buildQuery();
    this.fetching = true;

    console.log(this.props.text);


    /*

                      <Card elevation={1} className={classes.card}>
                        <CardContent>
                          <Word value={{name: this.result, selectedVowel: this.props.vowel}} />
                        </CardContent>
                      </Card>

    */

    if (this.props.isPaused) {

      return this.getCard(this.props.text, classes);

    }

    return (

      <React.Fragment>

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

      <Grid container className={classes.wordGrid} justify="center">
        <Grid item>

              { (!this.props.vowel || (!this.props.vowel.length && !this.props.mode)) ? '' : (this.props.mode === 'Intermission') ? <Intermission /> : <Query query={this.query} fetchPolicy="no-cache" errorPolicy="all" variables={{ v: Math.random() }} onCompleted={() => {  }}>
                {({ loading, error, data, refetch }) => {

                  this.refresh = refetch;

                  if (error) {

                    this.result = null;
                    this.fetching = false;

                    if (this.props.mode === 'Word') {
                      return(<div>
                        <Word value={{name: "No Result Found", selectedVowel: this.props.vowel}} />
                      </div>);
                    }

                    if (this.props.mode === 'Sentence') {
                      return(<div>
                        <Word value={{name: "No Result Found", selectedVowel: this.props.vowel}} />
                      </div>);
                    }

                  }

                  if (data) {

                    if (this.props.isPaused) { console.log("grab previous result?"); }

                    // check if data object is empty
                    if (Object.keys(data).length === 0 && data.constructor === Object) {
                      this.result = null;
                      refetch();
                      return null;
                    }

                    // check if word is a repeat...
                    if (this.props.mode === 'Word' && data.words) {
                      if (this.result === data.words.lexeme && this.fetching){ // if repeat word, refetch
                        refetch();
                      }

                      if (this.result !== data.words.lexeme && this.fetching) { // if new result, store and display
                        this.result = data.words.lexeme; // assign word to result

                        let fetched = {
                          id: data.words.id,
                          wordid: data.words.wordid,
                          title: data.words.lexeme,
                          score: data.words.score,
                          votes: data.words.votes,
                          comments: [],
                          type: "text",
                          time: Date.now()
                        };

                        this.fetching = false;
                        this.props.addWord(fetched.title);
                        this.props.addQueryResult(fetched);
                      }

                    } else if (this.props.mode === 'Sentence' && (typeof data.sentences !== "undefined") && data.sentences.words.length > 0) { // if we are fetching sentences

                      // build result
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

                        // parse for WordHistory
                        let fetched = [];
                        for (let i = 0; i < data.sentences.words.length; i++) {
                          fetched.push({
                            id: data.sentences.words[i].id,
                            wordid: data.sentences.words[i].wordid,
                            title: data.sentences.words[i].lexeme,
                            score: data.sentences.words[i].score,
                            votes: data.sentences.words[i].votes,
                            comments: [],
                            type: "text"
                          })
                        }

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
                  }

                  if (loading) return null;

                  if (this.props.mode === 'Sentence') {

                    return (
                      <Card elevation={1} className={classes.card}>
                        <CardContent>
                          <Sentence value={{name: this.result, selectedVowel: this.props.vowel}} />
                        </CardContent>
                      </Card>
                    );

                  } else if (this.props.mode === 'Word') {

                    /*
                    var msg = new SpeechSynthesisUtterance(this.result);
                    window.speechSynthesis.speak(msg);
                    */

                    return (
                      <Card elevation={1} className={classes.card}>
                        <CardContent>
                          <Word value={{name: this.result, selectedVowel: this.props.vowel}} />
                        </CardContent>
                      </Card>
                    );

                  } else {

                    return (
                      <Card elevation={0} className={classes.card}>
                        <CardContent>
                          <Sentence value={{name: this.result, selectedVowel: this.props.vowel}} />
                        </CardContent>
                      </Card>
                    );

                  }

                  }}
                  </Query>
                }

        </Grid>
      </Grid>

      </React.Fragment>

    );

  }
 }

WordCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const WordCardWrapped = withStyles(styles)(WordCard);

export default WordCardWrapped;
