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

    let vowel = JSON.stringify(routineConfig.vowel);
    let consonant = JSON.stringify(routineConfig.consonant);
    let syllables = JSON.stringify(routineConfig.syllables);
    let limit = parseInt(routineConfig.limit);
    let position = JSON.stringify(routineConfig.position);

    switch(routineConfig.mode) {
      case 'Sentence':
        if (routineConfig.consonant.length > 0 && routineConfig.vowel.length > 0) {
          return gql`
                {
                    sentences(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
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
                    sentences(consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
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
                    sentences(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
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
                    sentences(syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
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
                    words(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
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
                `;
        } else if (routineConfig.consonant.length > 0 && !routineConfig.vowel.length > 0) {
          return gql`
                {
                    words(consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
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
                `;
        } else if (!routineConfig.consonant.length > 0 && routineConfig.vowel.length > 0) {
          return gql`
                {
                    words(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
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
                `;
        } else {
          return gql`
                {
                    words(syllables: ${syllables}, limit: ${limit}, position: ${position}) {                    
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
                `;
        }

      default:
        console.log("No Query...");
        return null;
    }

  }

  render() {
    const { classes } = this.props;

    this.fetching = true;

    return (

      <div>

        <Card elevation="0" className={classes.previewCard}>
          <CardContent>
            { (this.state.query === null) ? '' : <Query query={this.state.query} fetchPolicy="cache-and-network" errorPolicy="all" variables={{ v: Math.random() }} onCompleted={() => { }}>
              {({ loading, error, data, refetch }) => {

                this.refresh = refetch;

                console.log("loading: ", loading);

                if (error) {

                  this.result = null;
                  this.fetching = false;

                  if (this.props.routineStep.mode === 'Word') {
                    return(<div>
                      <Word value={{name: "No Result Found", selectedVowel: this.props.routineStep.vowel}} />
                    </div>);
                  }

                  if (this.props.routineStep.mode === 'Sentence') {
                    return(<div>
                      <Word value={{name: "No Result Found", selectedVowel: this.props.routineStep.vowel}} />
                    </div>);
                  }

                }

                if (data) {

                  // check if data object is empty
                  if (Object.keys(data).length === 0 && data.constructor === Object) {
                    this.result = null;
                    refetch();
                    return null;
                  }

                  // check if word is a repeat...
                  if (this.props.routineStep.mode === 'Word' && data.words) {

                    if (this.result === data.words.lexeme && this.fetching){ // if repeat word, refetch
                      refetch();
                    }

                    if (this.result !== data.words.lexeme && this.fetching) { // if new result, store and display
                      this.result = data.words.lexeme; // assign word to result
                      this.fetching = false;
                    }

                  } else if (this.props.routineStep.mode === 'Sentence' && (typeof data.sentences !== "undefined") && data.sentences.words.length > 0) { // if we are fetching sentences

                    // build result
                    let result = "";

                    for (let i = 0; i < data.sentences.words.length; i++) {
                      result += data.sentences.words[i].lexeme;
                      if (i < (data.sentences.words.length - 1)) result += " ";
                    }

                    if (this.result !== result) { // if new result, store and display
                      this.result = result; // assign newly generated sentence to result
                      this.fetching = false;
                    }
                  }
                }

                if (loading) return null;

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
