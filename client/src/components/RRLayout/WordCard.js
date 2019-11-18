import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Intermission from './IntermissionContainer';
import VowelCheckboxes from './VowelCheckboxes';
import { styles } from '../../themeHandler';

import VowelCheckbox from './elements/VowelCheckbox';
import Word from './elements/Word';
import Sentence from './elements/Sentence';

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
    console.log("OBJ" , obj);
    this.props.addWord(obj);
  }


  buildQuery() {

    let vowel = JSON.stringify(this.props.vowel);
    let consonant = JSON.stringify(this.props.consonant);
    let syllables = JSON.stringify(this.props.syllables);
    let limit = parseInt(this.props.limit);

    let position = JSON.stringify(this.props.position);

    switch(this.props.mode) {
        case 'Sentence':
            if (this.props.consonant.length > 0 && this.props.vowel.length > 0) {
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
            } else if (this.props.consonant.length > 0 && !this.props.vowel.length > 0) {
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
            } else if (!this.props.consonant.length > 0 && this.props.vowel.length > 0) {
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
            if (this.props.consonant.length > 0 && this.props.vowel.length > 0) {
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
            } else if (this.props.consonant.length > 0 && !this.props.vowel.length > 0) {
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
            } else if (!this.props.consonant.length > 0 && this.props.vowel.length > 0) {
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

  render() {
    const { classes } = this.props;

    if (this.props.vowel === null || this.props.consonant === null) return null;

    this.query = this.buildQuery();

    this.fetching = true;

    return (

      <Grid container className={classes.wordGrid} justify="center">
        <Grid item>

          <Card elevation="1" className={classes.card}>
            <CardContent>
              { (!this.props.vowel || (!this.props.vowel.length && !this.props.mode)) ? '' : (this.props.mode === 'Intermission') ? <Intermission /> : <Query query={this.query} fetchPolicy="cache-and-network" errorPolicy="all" variables={{ v: Math.random() }} onCompleted={() => {  }}>
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
                          title: data.words.lexeme,
                          score: data.words.score,
                          votes: data.words.votes,
                          comments: [],
                          type: "text",
                          time: Date.now()
                        };

                        this.fetching = false;
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

                    return(<div>
                      <Sentence value={{name: this.result, selectedVowel: this.props.vowel}} />
                    </div>);

                  } else {

                    return(<div>
                      <Word value={{name: this.result, selectedVowel: this.props.vowel}} />
                    </div>);

                  }

                  }}
                  </Query>
                }
            </CardContent>
          </Card>

          {/* VowelCheckboxes.map((item, i) => (
             <>

               <VowelCheckbox action={this.handleChange} value={{name: item.name, displayName: item.label, selectedVowel: this.props.vowel}} />

             </>
          )) */}

        </Grid>
      </Grid>

    );

  }
 }

WordCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const WordCardWrapped = withStyles(styles)(WordCard);

export default WordCardWrapped;
