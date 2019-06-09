import React from 'react';
//import styled from 'styled-components/macro';
import { withStyles } from "@material-ui/core/styles";
import WordCardContainer from './WordCardContainer';
import TimerContainer from './TimerContainer';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckboxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ExerciseHistoryContainer from './ExerciseHistoryContainer';
import ProgressIndicator from './ProgressIndicatorContainer'
import WordHistory from './WordHistoryContainer'
//import CheckboxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 25
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
  sideTitle: {
    fontSize: 18
  },
  exerciseHeadline: {
    margin: "0.25em"
  },
});

const RRHome = props => {

  const {classes} = props;

  return (

      <div className={classes.root}>
        <Grid container spacing={24}>

          <Grid item xs={12} sm={3}>

            <div className={classes.sideColumn}>
              <ExerciseHistoryContainer />
              
            </div>

          </Grid>

          <Grid item xs={12} sm={6}>

            <WordCardContainer />
            <ProgressIndicator />
            {/* <WordHistory />  */}
          </Grid>

         

          <Grid item xs={12} sm={3}>
            <div className={classes.sideColumn}>

              <Card elevation="1" className={classes.sideColumn} style={{backgroundColor: props.dark === true ? "#262626" : '#ffffff'}}>
                <CardContent>
                  <Typography
                  component={'span'}
                    align="center"
                    className={classes.sideTitle}
                    color="textSecondary"
                  >

                    <TimerContainer />

                  </Typography>
                </CardContent>
              </Card>
              <br />
              <br />
              <Card elevation="1" className={classes.sideColumn} style={{backgroundColor: props.dark === true ? "#262626" : '#ffffff'}}>
                <CardContent>
                  <Typography
                  component={'span'}
                    align="center"
                    className={classes.sideTitle}
                    color="textSecondary"
                    style={{color: props.dark === true ? 'white' : 'black'}}
                  >
                    routine selector
                  </Typography>
                </CardContent>
              </Card>

            </div>
          </Grid>

        </Grid>
      </div>
    
  )}



const RRHomeWrapped = withStyles(styles)(RRHome);

export default RRHomeWrapped;
