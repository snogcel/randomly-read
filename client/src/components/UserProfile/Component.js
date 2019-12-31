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

UserProfile.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

const UserProfileWrapped = withStyles(styles)(UserProfile);

export default withWidth()(UserProfileWrapped);
