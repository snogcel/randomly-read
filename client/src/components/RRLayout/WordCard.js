import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useQuery, gql } from '@apollo/client';
import Intermission from './IntermissionContainer';
import { styles } from '../../themeHandler';
import RoutineDescription from './RoutineDescription';
import Word from './elements/Word';
import Sentence from './elements/Sentence';

const WordCard = (props) => {
  const fetchingRef = useRef(false);
  const resultRef = useRef(null);
  
  const { vowel, consonant, syllables, limit, position, age, mode, addQueryResult } = props;

  const buildQuery = useCallback(() => {
    let vowelStr = JSON.stringify(vowel);
    let consonantStr = JSON.stringify(consonant);
    let syllablesStr = JSON.stringify(syllables);
    let limitInt = parseInt(limit);

    let positionStr = JSON.stringify(position);
    let ageStr = JSON.stringify(age);

    switch(mode) {
        case 'Sentence':
            if (consonant.length > 0 && vowel.length > 0) {
                return gql`
                {
                    sentences(vowel: ${vowelStr}, consonant: ${consonantStr}, syllables: ${syllablesStr}, limit: ${limitInt}, position: ${positionStr}, age: ${ageStr}) {                    
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
            } else if (consonant.length > 0 && !vowel.length > 0) {
              return gql`
                {
                    sentences(consonant: ${consonantStr}, syllables: ${syllablesStr}, limit: ${limitInt}, position: ${positionStr}, age: ${ageStr}) {                    
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
            } else if (!consonant.length > 0 && vowel.length > 0) {
              return gql`
                {
                    sentences(vowel: ${vowelStr}, syllables: ${syllablesStr}, limit: ${limitInt}, position: ${positionStr}, age: ${ageStr}) {                    
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
                    sentences(syllables: ${syllablesStr}, limit: ${limitInt}, position: ${positionStr}, age: ${ageStr}) {                    
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
            if (consonant.length > 0 && vowel.length > 0) {
                return gql`
                {
                    words(vowel: ${vowelStr}, consonant: ${consonantStr}, syllables: ${syllablesStr}, limit: ${limitInt}, position: ${positionStr}, age: ${ageStr}) {                    
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
            } else if (consonant.length > 0 && !vowel.length > 0) {
              return gql`
                {
                    words(consonant: ${consonantStr}, syllables: ${syllablesStr}, limit: ${limitInt}, position: ${positionStr}, age: ${ageStr}) {                    
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
            } else if (!consonant.length > 0 && vowel.length > 0) {
              return gql`
                {
                    words(vowel: ${vowelStr}, syllables: ${syllablesStr}, limit: ${limitInt}, position: ${positionStr}, age: ${ageStr}) {                    
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
                    words(syllables: ${syllablesStr}, limit: ${limitInt}, position: ${positionStr}, age: ${ageStr}) {                    
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
            // console.log("No Query...");
            return null;
    }
  }, [vowel, consonant, syllables, limit, position, age, mode]);

  const query = buildQuery();
  
  // Use useQuery hook with proper configuration - moved to top to follow hooks rules
  const { loading, error, data, refetch } = useQuery(query, {
    skip: !query || mode === 'Intermission',
    fetchPolicy: "no-cache",
    errorPolicy: "all",
    variables: { v: Math.random() },
    onCompleted: () => {
      // Handle completion if needed
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0); // solves case of registration from splash page / scroll
  }, []);

  // Process data when available - moved to top to follow hooks rules
  useEffect(() => {
    if (data) {
      // Set fetching state
      fetchingRef.current = true;

      // check if data object is empty
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        resultRef.current = null;
        refetch();
        return;
      }

      // check if word is a repeat...
      if (mode === 'Word' && data.words) {
        if (resultRef.current === data.words.lexeme && fetchingRef.current) { // if repeat word, refetch
          refetch();
        }

        if (resultRef.current !== data.words.lexeme && fetchingRef.current) { // if new result, store and display
          resultRef.current = data.words.lexeme; // assign word to result

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

          fetchingRef.current = false;
          addQueryResult(fetched);
        }

      } else if (mode === 'Sentence' && (typeof data.sentences !== "undefined") && data.sentences.words.length > 0) { // if we are fetching sentences

        // build result
        let result = "";

        for (let i = 0; i < data.sentences.words.length; i++) {
          result += data.sentences.words[i].lexeme;
          if (i < (data.sentences.words.length - 1)) result += " ";
        }

        if (resultRef.current === result && fetchingRef.current) { // if repeat sentence, refetch
          refetch();
        }

        if (resultRef.current !== result && fetchingRef.current) { // if new result, store and display
          resultRef.current = result; // assign newly generated sentence to result

          fetchingRef.current = false;

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

          addQueryResult({
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
  }, [data, mode, addQueryResult, refetch]);



  const { classes } = props;

  // Early return for routine display
  if (props.currentExercise.length > 0 && props.currentExerciseNumber === null) {
    // calculate and format routine duration
    let duration = 0;

    for (let i = 0; i < props.currentExercise.length; i++) {
      duration += (props.currentExercise[i].rangeVal * props.currentExercise[i].repetitions);
    }

    let minutes = Math.floor(duration / 60);
    let seconds = duration - (minutes * 60);

    let formattedDuration;
    if (minutes === 0) {
      formattedDuration = "Duration: " + seconds + " seconds";
    } else if (minutes === 1) {
      formattedDuration = "Duration: " + minutes + " minute and " + seconds + " seconds";
    } else {
      formattedDuration = "Duration: " + minutes + " minutes and " + seconds + " seconds";
    }

    return (
      <Grid container justify="center">
        <Grid item xs={10} sm={12}>
          <Paper className={classes.routineDetails}>
            <Typography variant="h5" component="h2" className={classes.heading}>{props.name}</Typography>
            <Typography gutterBottom variant="body2" color="textSecondary" component="p">{formattedDuration}</Typography>
            <br />
            <RoutineDescription description={props.description} />
          </Paper>
        </Grid>
      </Grid>
    );
  }

  if (vowel === null || consonant === null) return null;

  // Handle error state
  if (error) {
    resultRef.current = null;
    fetchingRef.current = false;

    const errorContent = (
      <div>
        <Word value={{name: "No Result Found", selectedVowel: vowel}} />
      </div>
    );

    return (
      <Grid container className={classes.wordGrid} justify="center">
        <Grid item>
          {errorContent}
        </Grid>
      </Grid>
    );
  }

  // Show loading state
  if (loading) return null;

  // Show intermission if needed
  if (!vowel || (!vowel.length && !mode)) {
    return null;
  }

  if (mode === 'Intermission') {
    return (
      <Grid container className={classes.wordGrid} justify="center">
        <Grid item>
          <Intermission />
        </Grid>
      </Grid>
    );
  }

  // Render the word/sentence content
  let content;
  if (mode === 'Sentence') {
    content = (
      <Card elevation={1} className={classes.card}>
        <CardContent>
          <Sentence value={{name: resultRef.current, selectedVowel: vowel}} />
        </CardContent>
      </Card>
    );
  } else if (mode === 'Word') {
    content = (
      <Card elevation={1} className={classes.card}>
        <CardContent>
          <Word value={{name: resultRef.current, selectedVowel: vowel}} />
        </CardContent>
      </Card>
    );
  } else {
    content = (
      <Card elevation={0} className={classes.card}>
        <CardContent>
          <Sentence value={{name: resultRef.current, selectedVowel: vowel}} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container className={classes.wordGrid} justify="center">
      <Grid item>
        {content}
      </Grid>
    </Grid>
  );
};

WordCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const WordCardWrapped = withStyles(styles)(WordCard);

export default WordCardWrapped;
