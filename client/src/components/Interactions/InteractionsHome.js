import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { styles } from '../../themeHandler';

import InteractionForm from './elements/InteractionForm';
import InteractionTable from './elements/InteractionTable';

import store from "../../store";

class InteractionsHome extends React.Component {
  constructor(props) {
    super(props);

    this.interactionHandler = this.interactionHandler.bind(this);
    this.removeInteractionHandler = this.removeInteractionHandler.bind(this);

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

  componentDidMount() {
    if (typeof this.props.user !== "undefined") this.prepareInteractionForm();
  }

  prepareInteractionForm(){

    this.props.fetchInteractions();

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (typeof this.props.isVoting !== "undefined") {
      if ((prevProps.isVoting !== this.props.isVoting) && !this.props.isVoting) { // fetch updated routines

        this.props.fetchInteractions();

      }
    }

  }

  interactionHandler(interaction) {
    this.props.attemptCreateInteraction(interaction);
    // this.props.fetchInteractions({});
  }

  removeInteractionHandler(id) {
    this.props.attemptDeleteInteraction(id);
  }

  componentDidMount() {

  }

  render() {

    const { user } = this.props;
    const { classes } = this.props;

    let items = store.getState().interaction.items;


    return (

      <Grid className={classes.root}>

        {user ? (

          <Card className={classes.userAdminCard}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
                Focus Words
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Enter a word using the following search box, a practice routine will be available until it is removed from this list.
              </Typography>

              <br />

              <Grid container justify="center">
                <Grid item xs={11} sm={11} md={10}>
                  <InteractionForm action={this.interactionHandler}/>
                </Grid>
              </Grid>

              <Grid container justify="center">
                <Grid item xs={11} sm={11} md={10}>
                  <InteractionTable interactions={items} action={this.removeInteractionHandler}/>
                </Grid>
              </Grid>

            </CardContent>
          </Card>

        ) : ( this.props.history.push("/") )}

      </Grid>

    )

  }
}

const InteractionsHomeWrapped = withStyles(styles)(InteractionsHome);

export default InteractionsHomeWrapped;
