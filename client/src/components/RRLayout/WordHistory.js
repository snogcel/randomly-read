import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { styles } from '../../themeHandler';

let words = [];

/**
 * @return {boolean}
 */
function WordHistory(props) {

  if(props.word.length === 0) {
    console.log("- zero word length detected -");
    words.splice(0);
  }

  console.log(props.word);

  const {classes} = props;

  if (typeof props.word.word !== "undefined" && props.word.word && props.word.length !== 0) {
    words.unshift(props.word.word);
  }

  return (
    <React.Fragment>
      <Grid spacing={8}>
        { words.map((item, i) => (
          <Grid item xs={12}>
            <Card square elevation="0" style={{backgroundColor: 'transparent'}}>
              <CardContent>
                <Typography className={classes.historyTitle} color="textPrimary" variant="h3">{item}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )) }
      </Grid>
    </React.Fragment>
  )

}

const WordHistoryWrapped = withStyles(styles)(WordHistory);

export default WordHistoryWrapped;
