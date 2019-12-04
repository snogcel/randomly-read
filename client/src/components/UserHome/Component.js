import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../themeHandler';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import PostListContainer from '../PostList/Container';

import store from "../../store";

import Empty from '../shared/Empty';

class UserHome extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidUpdate(prevProps) {

  }

  componentWillMount() {

  }

  componentDidMount() {

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
