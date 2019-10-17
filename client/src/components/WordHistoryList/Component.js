import React from 'react';
import styled from 'styled-components/macro';
import WordHistoryListItem from './Item';
import LoadingIndicatorBox from '../shared/LoadingIndicator/Box';
import Empty from '../shared/Empty';

import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { styles } from '../../themeHandler';

class WordHistoryList extends React.Component {
  loadPosts = () => {
    const { username, category } = this.props;
    if (username) return this.props.fetchProfile(username);
    return this.props.fetchPosts(category);
  };

  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.category !== prevProps.category ||
      this.props.username !== prevProps.username
    )
      this.loadPosts();
  }

  mapPosts = () =>
    this.props.posts.map((post, index) => (
      <Grid item xs={12}><WordHistoryListItem key={index} {...post} /></Grid>
    ));

  render() {

    const {classes} = this.props;

    if (this.props.isFetching) return <LoadingIndicatorBox />;
    if (!this.props.posts || this.props.posts.length === 0) return <Empty />;
    console.log(this.props.posts);

    return <Grid container className={classes.root} spacing={2}>{this.mapPosts()}</Grid>;

  }
}

const WordHistoryListWrapped = withStyles(styles)(WordHistoryList);

export default WordHistoryListWrapped;
