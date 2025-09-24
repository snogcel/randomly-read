import React, { useEffect } from 'react';
import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';

import { styles } from '../../themeHandler';
import ViewHistoryContainer from '../ViewHistory/Container';

const UserProfile = (props) => {
  const navigate = useNavigate();
  const { user, classes, width } = props;

  let selectedUserId;
  let selectedUsername;
  let pageWrapperWidth = 12;

  if (width === "xl") {
    pageWrapperWidth = 8;
  }

  if (user) {
    selectedUserId = user.id;
    selectedUsername = user.username;
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Grid className={classes.root}>
      <Grid container spacing={0} justify="center">
        <Grid item xs={pageWrapperWidth}>
          <Card className={classes.userAdminCard}>
            <CardContent>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <ViewHistoryContainer userId={selectedUserId} username={selectedUsername} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

// UserProfile.propTypes removed - no longer using withWidth

const UserProfileWrapped = withStyles(styles)(UserProfile);

export default UserProfileWrapped;
