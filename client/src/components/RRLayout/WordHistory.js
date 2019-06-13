import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { styles } from '../../themeHandler';


  let words = [];
  function WordHistory(props) {

    if(props.word.length === 0) words = [];
    if(words.length === 5) words = [];

    const {classes} = props;

    if(props.word.word !== null && props.currentExerciseNumber !== null && props.word && props.word.length !== 0 && props.currentExerciseNumber % 2 === 0)  {

      words.push(props.word)
    }


    return (

      props.currentExerciseNumber !== null && words.length >= 0 ? (

      <Grid className={classes.column} container spacing={8}>
        {words.map((item, i) => ( 
          <Grid item xs={12}>
            <Card square elevation="0" style={{backgroundColor: 'transparent'}}>
            <CardContent>
            {props.currentExerciseNumber === null ? '' : <Typography className={classes.historyTitle} color="textPrimary" style={{color: props.dark === true ? 'white' : '#2f8eed'}} variant="h3">{item.word}</Typography>}
           {/*   <CardActions style={{justifyContent: 'center'}}>
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
                          {data.words[0].lexeme}
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
                    </CardActions> */}
            </CardContent>
            </Card>
            <br></br>  {/* Temporary work around for paddingBottom */}
            </Grid>

        ))}
      </Grid>
      ) : ''
    )
  }

  const WordHistoryWrapped = withStyles(styles)(WordHistory);


export default WordHistoryWrapped;
