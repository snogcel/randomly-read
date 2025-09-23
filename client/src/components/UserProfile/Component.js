import React from 'react';
import { withStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';

import { styles } from '../../themeHandler';

import ViewHistoryContainer from '../ViewHistory/Container';

class UserProfile extends React.Component {

  render() {

    const { user } = this.props;
    const { classes } = this.props;
    const { width } = this.props;

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

    return (

      <Grid className={classes.root}>

        <Grid container spacing={0} justify="center">

          <Grid item xs={pageWrapperWidth}>

            {user ? (
              <>
                <Card className={classes.userAdminCard}>
                  <CardContent>

                    <Grid container justify="center">
                      <Grid item xs={12}>
                        <ViewHistoryContainer userId={selectedUserId} username={selectedUsername} />
                      </Grid>
                    </Grid>

                  </CardContent>
                </Card>
              </>
            ) : ( this.props.history.push("/") )}

          </Grid>

        </Grid>

      </Grid>

    )

  }
}

// UserProfile.propTypes removed - no longer using withWidth

const UserProfileWrapped = withStyles(styles)(UserProfile);

export default UserProfileWrapped;
