import React, { useState, useEffect} from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    column: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary
    }
   
  });
  
 let words = [];
  function WordHistory(props) {
    const {classes} = props;
    if(props.word.length !== 0) {
    words.push(props.word)
    }
    console.log(props.word.length)
    console.log("WORDS", words)
    return(

            <Grid item xs={12} sm={3} className={classes.column}>
            {words.map((item, i) => (
            props.currentExerciseNumber !== null ?  (  
 <Card square elevation="1" style={{backgroundColor: props.dark === true ? "#262626" : '#ffffff'}}>
 <CardContent>
 {props.currentExerciseNumber === null ? '' : <Typography style={{color: props.dark === true ? 'white' : 'black'}} variant="h6">{item.word}</Typography>}
</CardContent>

</Card>
            ) : ''
 ))}
 </Grid>
    
    )
  }

  const WordHistoryWrapped = withStyles(styles)(WordHistory);


export default WordHistoryWrapped;