import React, { useEffect, useState } from 'react';
import { styled, useTheme } from "@mui/material/styles";
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { styles } from '../../themeHandler';

import InteractionForm from './elements/InteractionForm';
import InteractionTable from './elements/InteractionTable';

import store from "../../store";

function InteractionsHome(props) {
  const theme = useTheme();
  const classes = styles(theme);

  const [state, setState] = useState({
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
  });

  const prepareInteractionForm = () => {
    props.fetchInteractions();
  };

  useEffect(() => {
    if (typeof props.user !== "undefined") {
      prepareInteractionForm();
    }
  }, [props.user]);

  useEffect(() => {
    if (typeof props.isVoting !== "undefined") {
      if (!props.isVoting) {
        props.fetchInteractions();
      }
    }
  }, [props.isVoting]);

  const interactionHandler = (interaction) => {
    props.attemptCreateInteraction(interaction);
  };

  const removeInteractionHandler = (id) => {
    props.attemptDeleteInteraction(id);
  };

  const { user } = props;

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

            <Grid container justifyContent="center">
              <Grid item xs={11} sm={11} md={10}>
                <InteractionForm action={interactionHandler}/>
              </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <Grid item xs={11} sm={11} md={10}>
                <InteractionTable interactions={items} action={removeInteractionHandler}/>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      ) : ( props.history.push("/") )}
    </Grid>
  );
}

export default InteractionsHome;
