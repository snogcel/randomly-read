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
            console.log("Sentence Query...");
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
            console.log("Word Query...");
            if (this.props.consonant.length > 0) {
                return gql`
                {
                    words(vowel: ${vowel}, consonant: ${consonant}, syllables: ${syllables}, limit: ${limit}) {                    
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

          <Card elevation="0" className={classes.card} style={{backgroundColor: this.props.dark === true ? "#262626" : 'transparent'}}>
            <CardContent>
              { (!this.props.vowel || (!this.props.vowel.length && !this.props.mode)) ? '' : (this.props.mode === 'Intermission') ? <Intermission /> : <Query query={this.query} fetchPolicy="no-cache" onCompleted={() => { this.fetching = false; this.props.addWord({ word: this.result, definitions: null }); }}>
                {({ loading, error, data, refetch }) => {

                  if (loading) return null;

                  if (error) {
                    return(<div><Typography
                      component={'span'}
                      align="center"
                      className={classes.title}
                      color="textPrimary"
                    >Server Error
                    </Typography></div>);
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

                      console.log("empty result found");

                      return(<div><Typography
                        component={'span'}
                        align="center"
                        className={classes.title}
                        color="textPrimary"
                      >No Result Found
                      </Typography></div>);

                    }

                    if (this.props.mode === 'Sentence' && typeof(data.sentences) === 'undefined') {
                      return null;
                    }


                    // check if word is a repeat
                    if (this.props.mode === 'Word') {

                      if (this.result === data.words[0].lexeme && this.fetching){
                        refetch();
                      }

                      if (this.result !== data.words[0].lexeme && this.fetching) {
                        this.result = data.words[0].lexeme;
                        this.fetching = false;
                      }

                    } else if (this.props.mode === 'Sentence') {

                      if (this.result === data.sentences[0].result && this.fetching){
                        refetch();
                      }

                      if (this.result !== data.sentences[0].result && this.fetching) {

                        this.result = data.sentences[0].result;
                        this.fetching = false;

                      }

                    }

                  }

                  return (
                      <>
                      <Typography
                        component={'span'}
                        align="center"
                        className={classes.title}
                        color="textPrimary"
                        style={{color: this.props.dark === true ? 'white' : '#2f8eed'}}
                      >
                        { this.result }
                      </Typography>

                    { this.props.mode === 'Word' ?
                      <CardActions style={{justifyContent: 'center'}}>
                        <Typography
                          style={{color: this.props.dark === true ? 'white' : '#9C9C9C'}}
                          align="center"
                          component={'span'}
                          className={classes.seeMore}
                          color="textPrimary"
                          onClick={this.handleOpen}>
                          see more
                        </Typography>

                        <Modal
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                          open={this.state.open}
                          onClose={this.handleClose}
                          style={{color: this.props.dark === true ? 'white' : 'black'}}
                        >
                        <div style={{ top:'50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: this.props.dark === true ? '#262626' : 'white'}} className={classes.paper}>
                          <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} component={'span'} className={classes.title} color="textPrimary">
                            {this.result}
                          </Typography>
                            {data.words[0].wordsXsensesXsynsets.map((word, i) => {
                              return (
                                <>
                                <List dense="true">
                                  <ListItem>
                                    <ListItemText>
                                      <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} component={'span'}  color="textPrimary">
                                      {word.definition}
                                    </Typography>
                                    <Typography style={{color: this.props.dark === true ? 'white' : 'black'}} component={'span'} color="textSecondary">
                                    {word.pos}
                                    </Typography>
                                      </ListItemText>
                                  </ListItem>
                                </List>
                                </>
                              );
                            })}
                        </div>
                      </Modal>
                    </CardActions>
                    :  null}
                    </>

                  );


                  }}
                  </Query>
                }
            </CardContent>
          </Card>

          <br />

          { VowelCheckboxes.map((item, i) => (
             <>
             <Button style={{backgroundColor: JSON.stringify(this.props.vowel) === JSON.stringify([item.name]) ? '#33a0ff' : (this.props.dark === true ? "#262626" : "white")}} size="small" variant="contained" className={classes.button} onClick={() => this.handleChange(item.name)} color={this.props.dark === true ? "primary" : undefined}><b>{item.name}</b></Button>
             </>
          )) }

          {
            <>
            <div>
              <Button>
                <div>Button 1</div>
              </Button>
              <Button>
                <div>Button 2</div>
              </Button>
            </div>
            </>
          }



        </div>

    );

  }
 }

WordCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const WordCardWrapped = withStyles(styles)(WordCard);


export default WordCardWrapped;
