import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import { styles } from '../../themeHandler';

import InteractionForm from './elements/InteractionForm';
import InteractionTable from './elements/InteractionTable';

import Button from '@material-ui/core/Button';
import LoadingIndicatorBox from '../shared/LoadingIndicator/Box';
import LoginFormContainer from '../LoginForm/Container';
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

  componentWillMount() {
    if (typeof this.props.user !== "undefined") this.prepareInteractionForm();
  }

  prepareInteractionForm(){

    this.props.fetchInteractions();

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
          <>
            <Card className={classes.userAdminCard}>

              <CardContent>

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
          </>
        ) : ( this.props.history.push("/login") )}

      </Grid>

    )

  }
}

const InteractionsHomeWrapped = withStyles(styles)(InteractionsHome);

export default InteractionsHomeWrapped;
