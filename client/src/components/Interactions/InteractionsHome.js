import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import { makeStyles } from '@material-ui/core/styles';

import { getRoutineSettings } from '../../util/api';
import InteractionForm from './elements/InteractionForm';

import Button from '@material-ui/core/Button';

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

const intention = [
  { id: 1, name: "Did not remember", value: 1 },
  { id: 2, name: "Remembered", value: 50 },
  { id: 3, name: "Remembered and used", value: 100 }
];

const ease = [
  { id: 1, name: "Difficult", value: 25 },
  { id: 2, name: "Less Difficult", value: 50 },
  { id: 3, name: "Easier", value: 75 },
  { id: 4, name: "Easy", value: 100 }
];

const options = [{
  "audience": [ { id: 1, name: "Family or Friend" }, { id: 2, name: "Classmate or Colleague" }, { id: 3, name: "Authority Figure" }, { id: 4, name: "Service Worker" }, { id: 5, name: "No Relationship" }],
  "name": "Speaking at Work or School",
  "id": "5d962412a3f6d6a220d2e8d6"
}];

class InteractionsHome extends React.Component {
  constructor(props) {
    super(props);

    this.buttonHandler = this.buttonHandler.bind(this);

    this.state = {
      intention: [
        { id: 1, name: "Did not remember", value: 1 },
        { id: 2, name: "Remembered", value: 50 },
        { id: 3, name: "Remembered and used", value: 100 }
      ],
      ease: [
        { id: 1, name: "Difficult", value: 25 },
        { id: 2, name: "Less Difficult", value: 50 },
        { id: 3, name: "Easier", value: 75 },
        { id: 4, name: "Easy", value: 100 }
      ],
      options: [{
        "audience": [ { id: 1, name: "Family or Friend" }, { id: 2, name: "Classmate or Colleague" }, { id: 3, name: "Authority Figure" }, { id: 4, name: "Service Worker" }],
        "name": "Speaking at Work or School",
        "id": "5d962412a3f6d6a220d2e8d6"
      },{
        "audience": [ { id: 2, name: "Family or Friend" }, { id: 2, name: "Classmate or Colleague" }, { id: 3, name: "Authority Figure" }, { id: 4, name: "Service Worker" }, { id: 5, name: "No Relationship" }],
        "name": "Speaking at Work or School 2",
        "id": "5d962412a3f6d6a220d2e8d6"
      }],
      selectedOption: {
        "audience": []
      }
    };

  }

  componentWillMount() {
    let routines = this.renderMyData();
  }

  async renderMyData(){

    const routines = await getRoutineSettings(); // TODO - update to fetch interaction settings

    // TODO - fetch first item from options...
    this.setState({
      selectedOption: {
        "audience": [ { id: 1, name: "Family or Friend" }, { id: 2, name: "Classmate or Colleague" }, { id: 3, name: "Authority Figure" }, { id: 4, name: "Service Worker" }],
        "name": "Speaking at Work or School",
        "id": "5d962412a3f6d6a220d2e8d6"
      }
    });

    return routines;

  }

  buttonHandler(option) {
    this.setState({
      selectedOption: option
    });
  }

  componentDidMount() {

  }

  render() {

    return (

      <div>
        <Grid container spacing={24}>

          <Grid item xs={12} sm={3}>

            <Button onClick={() => { this.buttonHandler(this.state.options[0]) }}> Default </Button>

            <Button onClick={() => { this.buttonHandler(this.state.options[1]) }}> Default 2 </Button>

          </Grid>

          <Grid item xs={12} sm={6}>

            <InteractionForm options={this.state.selectedOption} />

          </Grid>

          <Grid item xs={12} sm={3}>

            Test

          </Grid>

        </Grid>
      </div>

    )

  }
}

const InteractionsHomeWrapped = withStyles(styles)(InteractionsHome);

export default InteractionsHomeWrapped;
