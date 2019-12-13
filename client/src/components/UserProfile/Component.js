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

import Button from '@material-ui/core/Button';
import LoadingIndicatorBox from '../shared/LoadingIndicator/Box';

import Hidden from '@material-ui/core/Hidden';

import ViewHistoryContainer from '../ViewHistory/Container';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {

    const { user } = this.props;
    const { classes } = this.props;

    let selectedUserId;
    let selectedUsername;

    if (user) {
      selectedUserId = user.id;
      selectedUsername = user.username;
    }

    return (

      <Grid className={classes.root}>

        {user ? (
          <>
            <Grid container justify="center">
              <Grid item xs={10}>
                <ViewHistoryContainer userId={selectedUserId} username={selectedUsername} />
              </Grid>
            </Grid>

          </>
        ) : ( this.props.history.push("/login") )}

      </Grid>

    )

  }
}

const UserProfileWrapped = withStyles(styles)(UserProfile);

export default UserProfileWrapped;
