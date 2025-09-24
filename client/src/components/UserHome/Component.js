import React from 'react';
import { withStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { styles } from '../../themeHandler';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import PostListContainer from '../PostList/Container';

import store from "../../store";

import Empty from '../shared/Empty';

class UserHome extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    const { classes } = this.props;
    const { user } = this.props;

    return (
      <Grid container>

        <Grid item xs={4}>

          Word View Statistics

        </Grid>

        <Grid item xs={4}>

          Interaction Statistics

        </Grid>

        <Grid item xs={4}>

          <PostListContainer username={user.username} />

        </Grid>

      </Grid>
    )

  }

}

const UserHomeWrapped = withStyles(styles)(UserHome);

export default UserHomeWrapped;
