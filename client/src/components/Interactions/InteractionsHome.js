import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import LoadingIndicatorBox from '../shared/LoadingIndicator/Box';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import { makeStyles } from '@material-ui/core/styles';

import { getRoutineSettings } from '../../util/api';
import InteractionForm from './elements/InteractionForm';
import InteractionTable from './elements/InteractionTable';

import Button from '@material-ui/core/Button';
import store from "../../store";

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

class InteractionsHome extends React.Component {
  constructor(props) {
    super(props);

    this.buttonHandler = this.buttonHandler.bind(this);
    this.interactionHandler = this.interactionHandler.bind(this);

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
      options: null,
      selectedOption: {}
    };

  }

  componentWillMount() {
    this.prepareInteractionForm();
  }

  prepareInteractionForm(){

    this.props.fetchInteractionSettings();

    this.props.fetchInteractions();

    let options = store.getState().interaction;

    this.setState({
      options: options.settings,
      selectedOption: options.settings[0]
    });

  }

  buttonHandler(option) {
    this.setState({
      selectedOption: option
    });
  }

  interactionHandler(interaction) {
    interaction.setting = this.state.selectedOption.name; // define setting based on current state
    this.props.attemptCreateInteraction(interaction);
    this.props.fetchInteractions({});
  }

  componentDidMount() {

  }

  render() {

    let items = store.getState().interaction.items;

    return (

      <div>
        <Grid container spacing={24}>

          <Grid item xs={12} sm={3}>

            {  this.state.options.map((item) => (
              <div><Button onClick={() => { this.buttonHandler(item) }} color={(item.name === this.state.selectedOption.name) ? "primary" : "secondary"}> {item.name} </Button></div>
            )) }

          </Grid>

          <Grid item xs={12} sm={6}>

            <InteractionForm options={this.state.selectedOption} action={this.interactionHandler}/>

          </Grid>

        </Grid>

        <br /><br />

        <Grid container spacing={24}>

          <Grid item xs={12} sm={3}>

          </Grid>

          <Grid item xs={12} sm={6}>

            <InteractionTable interactions={items}/>

          </Grid>
        </Grid>
      </div>

    )

  }
}

const InteractionsHomeWrapped = withStyles(styles)(InteractionsHome);

export default InteractionsHomeWrapped;
