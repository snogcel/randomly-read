import React from 'react';
import PropTypes from "prop-types";
import Fader from 'react-fader';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Intermission from '../RRLayout/IntermissionContainer';
import { styles } from '../../exerciseThemeHandler';
import Word from '../RRLayout/elements/Word';
import Sentence from '../RRLayout/elements/Sentence';

import withWidth from '@material-ui/core/withWidth';


class WordCard extends React.Component  {

  constructor(props) {
    super(props);

    this.state = { };

    this.fetching = false;
    this.debug = false;
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
        // if (typeof(data.sentences.words) !== "undefined" && result.length > 0 && this.fetching) {
          this.result = result; // assign newly generated sentence to result
          this.fetching = false;
          this.parseResult(mode, data);
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

    const { isCompleted, mode, text, vowel, classes, width } = this.props;

    if (isCompleted) {
      return this.renderCompletedCard();
    }

    if (text) {

      if ((width === "xs" || width === "sm")) {
        return (
          <React.Fragment key={'card'}>
  
            <Grid container direction="row" justifyContent="flex-end" alignItems="center" className={classes.wordGrid} justify="center" sx={{ width: 1, height: "100vh" }}>
              <Grid item>
  
                  { (mode === 'Intermission' ? <><Card elevation={0} className={classes.intermissionCard}>
                    <CardContent className={classes.cardContent}>
                        { (mode === 'Intermission' ?  <><Intermission /></> : null)}
                        { (mode === 'Word' ? <><Word mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                        { (mode === 'Sentence' ?  <><Sentence mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                    </CardContent>
                  </Card></> : <><Card elevation={0} className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        { (mode === 'Intermission' ?  <><Intermission /></> : null)}
                        { (mode === 'Word' ? <><Word mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                        { (mode === 'Sentence' ?  <><Sentence mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                    </CardContent>
                  </Card></>)}               
  
              </Grid>
            </Grid>
  
          </React.Fragment>
        );
      } else if ((width === "md" || width === "lg" || width === "xl")) {
        return (
          <React.Fragment key={'card'}>
  
            <Grid container direction="row" justifyContent="flex-end" alignItems="center" className={classes.wordGridDesktop} justify="center" sx={{ width: 1, height: "100vh" }}>
              <Grid item>
  
                  { (mode === 'Intermission' ? <><Card elevation={0} className={classes.intermissionCard}>
                    <CardContent className={classes.cardContent}>
                        { (mode === 'Intermission' ?  <><Intermission /></> : null)}
                        { (mode === 'Word' ? <><Word mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                        { (mode === 'Sentence' ?  <><Sentence mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                    </CardContent>
                  </Card></> : <><Card elevation={0} className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        { (mode === 'Intermission' ?  <><Intermission /></> : null)}
                        { (mode === 'Word' ? <><Word mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                        { (mode === 'Sentence' ?  <><Sentence mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                    </CardContent>
                  </Card></>)}               
  
              </Grid>
            </Grid>
  
          </React.Fragment>
        );
      }  

      

    } else {
      return this.renderEmptyCard();
    }

  }

  renderCompletedCard() {

    const { mode, text, vowel, classes, width } = this.props;

    if ((width === "xs" || width === "sm")) {
      return (
        <React.Fragment key={'card'}>
  
          <Grid container direction="row" justifyContent="flex-end" alignItems="center" className={classes.wordGrid} justify="center">
            <Grid item>
  
              { (mode === 'Intermission' ? <><Card elevation={0} className={classes.intermissionCard}><CardContent className={classes.cardContent}>
                  { (mode === 'Intermission' ?  <><Intermission /></> : null)}
                  { (mode === 'Word' ? <><Word mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                  { (mode === 'Sentence' ?  <><Sentence mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                </CardContent>
              </Card></> : <><Card elevation={0} className={classes.card}><CardContent className={classes.cardContent}>
                  { (mode === 'Intermission' ?  <><Intermission /></> : null)}
                  { (mode === 'Word' ? <><Word mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                  { (mode === 'Sentence' ?  <><Sentence mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                </CardContent>
              </Card></>)}            
                
            </Grid>
          </Grid>
  
        </React.Fragment>
      );
    } else if ((width === "md" || width === "lg" || width === "xl")) {
      return (
        <React.Fragment key={'card'}>
  
          <Grid container direction="row" justifyContent="flex-end" alignItems="center" className={classes.wordGridDesktop} justify="center">
            <Grid item>
  
              { (mode === 'Intermission' ? <><Card elevation={0} className={classes.intermissionCard}><CardContent className={classes.cardContent}>
                  { (mode === 'Intermission' ?  <><Intermission /></> : null)}
                  { (mode === 'Word' ? <><Word mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                  { (mode === 'Sentence' ?  <><Sentence mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                </CardContent>
              </Card></> : <><Card elevation={0} className={classes.card}><CardContent className={classes.cardContent}>
                  { (mode === 'Intermission' ?  <><Intermission /></> : null)}
                  { (mode === 'Word' ? <><Word mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                  { (mode === 'Sentence' ?  <><Sentence mode={mode} key={text} value={{name: text, selectedVowel: vowel}} /></> : null ) }
                </CardContent>
              </Card></>)}            
                
            </Grid>
          </Grid>
  
        </React.Fragment>
      );
    }

  }

  renderEmptyCard() {

    const { mode, classes, inProgress, width } = this.props;

    if (inProgress) {
      if ((width === "xs" || width === "sm")) {
        return (
          <React.Fragment key={'card'}>
  
            <Grid container direction="row" justifyContent="flex-end" alignItems="center" className={classes.wordGrid} justify="center">
              <Grid item>
  
              { (mode === 'Intermission' ? <><Card elevation={0} className={classes.intermissionCard}>
                  <CardContent className={classes.cardContent}>
                  </CardContent>
                </Card></> : <><Card elevation={0} className={classes.intermissionCard}>
                  <CardContent className={classes.cardContent}>
                  </CardContent>
                </Card></> )}              
  
              </Grid>
            </Grid>
  
          </React.Fragment>
        );
      } else if ((width === "md" || width === "lg" || width === "xl")) {
        return (
          <React.Fragment key={'card'}>
  
            <Grid container direction="row" justifyContent="flex-end" alignItems="center" className={classes.wordGridDesktop} justify="center">
              <Grid item>
  
              { (mode === 'Intermission' ? <><Card elevation={0} className={classes.intermissionCard}>
                  <CardContent className={classes.cardContent}>
                  </CardContent>
                </Card></> : <><Card elevation={0} className={classes.intermissionCard}>
                  <CardContent className={classes.cardContent}>
                  </CardContent>
                </Card></> )}              
  
              </Grid>
            </Grid>
  
          </React.Fragment>
        );
      }  
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
    const { currentExercise, currentExerciseNumber, mode, text, data } = props;

    this.fetching = true;

    // Check for empty word card
    if (currentExercise.length > 0 && currentExerciseNumber === null && text === "") {
      if (this.debug) console.log("-rendering with empty word card: ", this.props);
      return this.renderEmptyCard();
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

    if (data === null) {
      return this.renderEmptyCard();
    }

    // Set Query
    if (typeof(props.query) !== 'undefined' && props.query.action !== null) {
      this.query = props.query.action;
    } else {
      return this.renderEmptyCard();
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
  classes: PropTypes.object.isRequired,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const WordCardWrapped = withStyles(styles)(WordCard);

export default withWidth()(WordCardWrapped);
