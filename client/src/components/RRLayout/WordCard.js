import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckboxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckboxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Intermission from './IntermissionContainer';
import VowelCheckboxes from './VowelCheckboxes';
import Fab from "@material-ui/core/Fab";


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  column: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  sideColumn: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  card: {
    minHeight:175
  },
  sideCard: {
    marginBottom: 20
  },
  title: {
    fontSize: 36
  },
  subtitle: {
    fontSize: 20
  },
  sideTitle: {
    fontSize: 18
  },
  button: {
    margin: 4,
    minWidth: 35,
    padding: 4
  },
  activeButton: {
    margin: 4,
    minWidth: 35,
    padding: 4,
    backgroundColor: "#EFEFEF"
  },
  activeExercise: {
    backgroundColor: "#EFEFEF"
  },
  exerciseHeadline: {
    margin: "0.25em"
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

class WordCard extends React.Component  {



    constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => {


      this.props.addRoutineVowel([name])


   }


  setWord(title) {
      this.props.addWord(title)
  }

  componentWillReceiveProps() {
    console.log("Vowel:", this.props.vowel);
    console.log("consonant:", this.props.consonant);
    console.log("syllables:",this.props. syllables);
    console.log("limit:", this.props.limit);
    console.log("mode:", this.props.mode);
  }

  buildQuery() {

    let vowel = JSON.stringify(this.props.vowel);
    let consonant = JSON.stringify(this.props.consonant);
    let syllables= JSON.stringify(this.props.syllables);
    let limit = parseInt(this.props.limit);

    switch(this.props.mode) {
        case 'sentences':
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
            return null;
    }

}

  render() {
    const { classes } = this.props;
    const query = this.buildQuery();


    /* <Grid container justify='center' alignItems='center'>
      <Card style={{ width: 950, minHeight: '40vh', maxHeight: '40vh', overflow: 'hidden'}}>
        <Grid>
        <CardContent style={{ overflow: 'hidden'}}>
          {console.log(this.props.mode)}
           { (!this.props.vowel || !this.props.vowel.length && !this.props.mode)  ?
                ''
            : (this.props.mode === 'Intermission') ?
            <Intermission /> :
            <Query
            query={query}
            onCompleted={data => this.setWord(data.words[0].lexeme)}
          >
            {({ loading, error, data, refetch }) => {
              if (loading)
                return (
                  <Typography variant='h5' component='h2' align='center'>
                  </Typography>
                );
              if (error)
                return (
                  <Typography variant='h5' component='h2' align='center'>
                    Something went wrong... {error.message}
                  </Typography>
                );
              return (
                <>
                <Typography variant='h2' component='h2' align='center'>
                  { data.words[0].lexeme }
                </Typography>
                {data.words[0].wordsXsensesXsynsets.slice(0,2).map((word, i) => {
                  return (
                    <>
                    <Grid container direction='row' alignItems='center' justify = 'center'>
                  <Grid item xs={12} align='center'>
                  <Typography color='textSecondary' align='center'>
                    {(`(${word.pos}): `)}
                  </Typography>
                  </Grid>
                  <Grid item xs={12} align='center'>
                  <Typography component='p' align='center'>
                   { `${word.definition}` }
                  </Typography>
                  </Grid>
                  </Grid>
                  </>
                  );
                })}

                 <Button color="primary"  align='top' onClick={() => refetch()}> New Word! </Button>
                </>
              );
            }}
             </Query>
           }

        <Grid item align='bottom'>
        <CardActions style ={{overflow: 'hidden',  marginTop: 'auto'}}>
          <Button color="primary" variant="contained" size='small' align='bottom' style={{flex: 1}}>
            Vote
          </Button>
          <Button color="primary" variant="contained" size='small' align='bottom' style={{flex: 1 }}
          >
            Comment
          </Button>
        </CardActions>
        </Grid>
        <FormGroup row style={{ flex: '1', marginLeft: '25px', overflow: 'hidden'}} >
       { VowelCheckboxes.map((item, i) => (
       <>
           <FormControlLabel control={<Checkbox />}  label={item.label}  checked={this.props.vowel === null ? false : this.props.vowel.includes(item.name)} onChange={this.handleChange(item.name)}/>
       {/* <FormControlLabel control={<Fab color="primary" aria-label="Add" onClick={this.handleChangeButton(item.name)}> {item.name} </Fab>} /> */
     /*   </>

      ))}
        </FormGroup>
        </CardContent>
        </Grid>
      </Card>
       </Grid> */

    return (

        <div className={classes.column}>
          <Card square elevation="2" className={classes.card}>
            <CardContent>
              {console.log(this.props.mode)}
              { (!this.props.vowel || !this.props.vowel.length && !this.props.mode)  ?
                  ''
              : (this.props.mode === 'Intermission') ? <Intermission /> :
              <Query
              query={query}
              onCompleted={data => this.setWord(data.words[0].lexeme)}
              >
              {({ loading, error, data, refetch }) => {

                if (loading)
                  return (
                   ''
                  );

                if (error)
                  return (
                    <Typography
                    align="center"
                    className={classes.title}
                    color="textPrimary"
                  >
                    Error
                  </Typography>
                  );

                return (
                    <>
                    <Typography
                      align="center"
                      className={classes.title}
                      color="textPrimary"
                    >
                      {data.words[0].lexeme}
                    </Typography>

                    <Button color="primary"  align='top' onClick={() => refetch()}> New Word! </Button>

                    <CardActions>

                      <Button onClick={this.handleOpen} size="small">
                        See More
                      </Button>
                      <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                      >
                      <div style={getModalStyle()} className={classes.paper}>
                        <Typography className={classes.title} color="textPrimary">
                          {data.words[0].lexeme}
                        </Typography>
                          {data.words[0].wordsXsensesXsynsets.slice(0,2).map((word, i) => {
                            return (
                              <>
                              <List dense="true">
                                <ListItem>
                                  <ListItemText
                                    primary={word.definition}
                                    secondary={word.pos}
                                  />
                                </ListItem>
                              </List>
                              </>
                            );
                          })}
                      </div>
                    </Modal>
                  </CardActions>
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
             <Button style ={{backgroundColor: "#ffffff"}} size="small" variant="contained" className={classes.button} onClick={() => this.handleChange(item.name)}>{item.name}</Button>
             </>
          ))}

        </div>

    );

  }
 }

WordCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const WordCardWrapped = withStyles(styles)(WordCard);


export default WordCardWrapped;
