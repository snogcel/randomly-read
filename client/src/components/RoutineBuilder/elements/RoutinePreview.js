import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import RoutinePreviewBuilder from '../../RRLayout/RoutineBuilder';

import Intermission from '../../RRLayout/IntermissionContainer';

import Word from '../../RRLayout/elements/Word';

import { styles } from '../../../themeHandler';

class RoutinePreview extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      query: null
    };

    this.refreshQuery = this.refreshQuery.bind(this);
    this.routinePreviewBuilder = new RoutinePreviewBuilder();

    this.result = "";
    this.query = null;

  }

  refreshQuery() {

    let query = this.buildQuery();

    this.setState({ "query": query });

    if (this.refresh) this.refresh();

  }

  buildQuery() {

    console.log(this.props.routineStep);

    let routine = this.props.routineStep;

    let routineStep = {};
    // routine.repetitions = 1; // hard code to one repetition (for preview purposes);

    // Stub out exerciseConfig
    let duration = (parseInt(routine.repetitions) * parseInt(routine.rangeVal));

    routine.duration = duration; // calculation exercise duration
    routine.templates = []; // for future functionality
    routine.limit = 1; // for future functionality
    (routine.mode === "Word") ? routine.map = "randomly" : routine.map = "default";

    switch (routine.map) {
      case 'default':
        routineStep = this.routinePreviewBuilder.build(routine);
        console.log("Exercise Map", routineStep);
        break;
      case 'randomly':
        routineStep = this.routinePreviewBuilder.buildRandomly(routine);
        console.log("Exercise Map", routineStep);
        break;
      case 'intermission':
        routineStep = this.routinePreviewBuilder.buildIntermission(routine);
        console.log("Exercise Map (Intermission)", routineStep);
        break;
      default:
        break;
    }

    let routineConfig = routineStep.values().next().value || {};

    console.log(routineConfig);

    let vowel = JSON.stringify(routineConfig.vowel);
    let consonant = JSON.stringify(routineConfig.consonant);
    let syllables = JSON.stringify(routineConfig.syllables);
    let limit = parseInt(routineConfig.limit);

    switch(routineConfig.mode) {
      case 'Sentence':
        if (routineConfig.consonant.length > 0 && routineConfig.vowel.length > 0) {
          return gql`
                {
                    sentences(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          cmudict_id
                          lexeme
                        }                       
                    }
                }
                `;
        } else if (routineConfig.consonant.length > 0 && !routineConfig.vowel.length > 0) {
          return gql`
                {
                    sentences(consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          cmudict_id
                          lexeme
                        }                       
                    }
                }
                `;
        } else if (!routineConfig.consonant.length > 0 && routineConfig.vowel.length > 0) {
          return gql`
                {
                    sentences(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          cmudict_id
                          lexeme
                        }                       
                    }
                }
                `;
        } else {
          return gql`
                {
                    sentences(syllables: ${syllables}, limit: ${limit}) {                    
                        words {
                          id
                          votes {
                            user
                            vote
                          }
                          score
                          cmudict_id
                          lexeme
                        }
                    }
                }
                `;
        }

      case 'Word':
        if (routineConfig.consonant.length > 0 && routineConfig.vowel.length > 0) {
          return gql`
                {
                    words(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        cmudict_id
                        lexeme
                        wordsXsensesXsynsets {
                          wordid
                          pos
                          definition
                      }
                    }
                }
                `;
        } else if (routineConfig.consonant.length > 0 && !routineConfig.vowel.length > 0) {
          return gql`
                {
                    words(consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        cmudict_id
                        lexeme
                        wordsXsensesXsynsets {
                          wordid
                          pos
                          definition
                      }
                    }
                }
                `;
        } else if (!routineConfig.consonant.length > 0 && routineConfig.vowel.length > 0) {
          return gql`
                {
                    words(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        cmudict_id
                        lexeme
                        wordsXsensesXsynsets {
                          wordid
                          pos
                          definition
                      }
                    }
                }
                `;
        } else {
          return gql`
                {
                    words(syllables: ${syllables}, limit: ${limit}) {                    
                        id
                        votes {
                          user
                          vote
                        }
                        score
                        cmudict_id
                        lexeme
                        wordsXsensesXsynsets {
                          wordid
                          pos
                          definition
                      }
                    }
                }
                `;
        }

      default:
        console.log("No Query...");
        return null;
    }

  }

  render() {
    const { classes } = this.props;

    console.log(this.props.routineStep);

    return (

      <div className={classes.column}>

        <Card elevation="0" className={classes.card}>
          <CardContent>
            { (this.state.query === null) ? '' : <Query query={this.state.query} fetchPolicy="no-cache" onCompleted={() => { this.fetching = false; }}>
              {({ loading, error, data, refetch }) => {

                if (loading) return null;

                if (error) {
                  return(<div>
                    <Word value={{name: "Server Error", selectedVowel: this.props.routineStep.vowels}} />
                  </div>);
                }

                if (data) {

                  this.refresh = refetch;

                  // check if data object is empty
                  if (Object.keys(data).length === 0 && data.constructor === Object) {
                    this.result = null;
                    refetch();
                    return null;
                  }

                  if (this.props.routineStep.mode === 'Word' && typeof(data.words) === 'undefined') {
                    this.result = null;

                    return(<div>
                      <Word value={{name: "No Result", selectedVowel: this.props.routineStep.vowel}} />
                    </div>);
                  }

                  if (this.props.routineStep.mode === 'Sentence' && typeof(data.sentences) === 'undefined') {
                    return(<div>
                      <Word value={{name: "No Result", selectedVowel: this.props.routineStep.vowel}} />
                    </div>);
                  }


                  // check if word is a repeat...
                  if (this.props.routineStep.mode === 'Word' && data.words) {

                    if (this.result === data.words.lexeme){ // if repeat word, refetch
                      refetch();
                    }

                    if (this.result !== data.words.lexeme) { // if new result, store and display
                      this.result = data.words.lexeme; // assign word to result
                    }

                  } else if (this.props.routineStep.mode === 'Sentence' && data.sentences.words.length > 0) { // if we are fetching sentences

                    // build result
                    let result = "";

                    for (let i = 0; i < data.sentences.words.length; i++) {
                      result += data.sentences.words[i].lexeme;
                      if (i < (data.sentences.words.length - 1)) result += " ";
                    }

                    if (this.result !== result) { // if new result, store and display
                      this.result = result; // assign newly generated sentence to result
                    }
                  }
                }

                return(<div>
                  <Word value={{name: this.result, selectedVowel: this.props.routineStep.vowel}} />
                </div>);

              }}
            </Query>
            }
          </CardContent>
        </Card>

      </div>

    );

  }
}

const RoutinePreviewWrapped = withStyles(styles)(RoutinePreview);

export default RoutinePreviewWrapped;
