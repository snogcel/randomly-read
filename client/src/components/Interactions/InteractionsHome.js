import React, { useEffect, useCallback } from 'react';
import { useTheme } from "@mui/material/styles";
import { withStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
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
  const { classes } = props;
  const navigate = useNavigate();
  
  const { user, fetchInteractions, isVoting, attemptCreateInteraction, attemptDeleteInteraction } = props;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const prepareInteractionForm = useCallback(() => {
    fetchInteractions();
  }, [fetchInteractions]);

  useEffect(() => {
    if (typeof user !== "undefined") {
      prepareInteractionForm();
    }
  }, [user, prepareInteractionForm]);

  useEffect(() => {
    if (typeof isVoting !== "undefined") {
      if (!isVoting) {
        fetchInteractions();
      }
    }
  }, [isVoting, fetchInteractions]);

  const interactionHandler = (interaction) => {
    attemptCreateInteraction(interaction);
  };

  const removeInteractionHandler = (id) => {
    attemptDeleteInteraction(id);
  };

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
      ) : null}
    </Grid>
  );
}

const InteractionsHomeWithStyles = withStyles(styles)(InteractionsHome);

export default InteractionsHomeWithStyles;
