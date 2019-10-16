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
import Intermission from './IntermissionContainer';
import VowelCheckboxes from './VowelCheckboxes';
import { styles } from '../../themeHandler';

import VowelCheckbox from './elements/VowelCheckbox';
import Word from './elements/Word';

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

    // if (this.fetching) return null;

    let vowel = JSON.stringify(this.props.vowel);
    let consonant = JSON.stringify(this.props.consonant);
    let syllables= JSON.stringify(this.props.syllables);
    let limit = parseInt(this.props.limit);

    switch(this.props.mode) {
        case 'Sentence':
            if (this.props.consonant.length > 0) {
                return gql`
                {
                    sentences(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}) {                    
                        result
                        formatted                   
                    }
                }
                `;
            } else {
                return gql`
                {
                    sentences(vowel: ${vowel}, syllables: ${syllables}, limit: ${limit}) {                    
                        result
                        formatted                  
                    }
                }
                `;
            }

        case 'Word':
            if (this.props.consonant.length > 0) {
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
            } else {
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

    this.query = this.buildQuery();

    this.fetching = true;

    return (

        <div className={classes.column}>

          <Card elevation="0" className={classes.card}>
            <CardContent>
              { (!this.props.vowel || (!this.props.vowel.length && !this.props.mode)) ? '' : (this.props.mode === 'Intermission') ? <Intermission /> : <Query query={this.query} fetchPolicy="no-cache" onCompleted={() => { this.fetching = false; this.props.addWord({ word: this.result, definitions: null }); }}>
                {({ loading, error, data, refetch }) => {

                  if (loading) return null;

                  if (error) {
                    return(<div>
                      <Word value={{name: "Server Error", selectedVowel: this.props.vowel}} />
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

                    if (this.props.mode === 'Word' && typeof(data.words) === 'undefined') {
                      this.result = null;

                      return(<div>
                        <Word value={{name: "No Result", selectedVowel: this.props.vowel}} />
                      </div>);
                    }

                    if (this.props.mode === 'Sentence' && typeof(data.sentences) === 'undefined') {
                      return(<div>
                        <Word value={{name: "No Result", selectedVowel: this.props.vowel}} />
                      </div>);
                    }


                    // check if word is a repeat...
                    if (this.props.mode === 'Word' && data.words.length > 0) {
                      if (this.result === data.words[0].lexeme && this.fetching){ // if repeat word, refetch
                        refetch();
                      }

                      if (this.result !== data.words[0].lexeme && this.fetching) { // if new result, store and display
                        this.result = data.words[0].lexeme; // assign word to result

                        let fetched = {
                          id: data.words[0].id,
                          title: data.words[0].lexeme,
                          score: data.words[0].score,
                          votes: data.words[0].votes,
                          comments: [],
                          type: "text"
                        };

                        console.log(fetched);

                        this.fetching = false;
                        this.props.addQueryResult(fetched);
                      }
                    } else if (this.props.mode === 'Sentence' && data.sentences.length > 0) { // if we are fetching sentences...

                      if (this.result === data.sentences[0].result && this.fetching){ // if repeat sentence, refetch
                        refetch();
                      }

                      if (this.result !== data.sentences[0].result && this.fetching) { // if new result, store and display
                        this.result = data.sentences[0].result; // assign sentence to result

                        console.log(data.sentences[0]);

                        this.fetching = false;
                        this.props.addQueryResult(this.result);
                      }
                    }
                  }

                  return(<div>
                    <Word value={{name: this.result, selectedVowel: this.props.vowel}} />
                  </div>);

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

        </div>

    );

  }
 }

WordCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const WordCardWrapped = withStyles(styles)(WordCard);


export default WordCardWrapped;
