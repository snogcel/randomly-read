import React from 'react';
import styled from 'styled-components/macro';
import PostVoteUpvote from './Upvote';
import PostVoteDownvote from './Downvote';

import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { styles } from '../../../themeHandler';

const Wrapper = styled.div`

  align-items: center;
  width: 30px;
  padding: 4px;
  font-size: 12px;
  line-height: 25px;
  font-weight: 500;
  text-align: center;
  color: ${props => props.theme.normalText};
`;

class PostVote extends React.Component {
  constructor(props) {
    super(props);
    const didVote = PostVote.existingVote(props);
    this.state = {
      score: props.score,
      title: props.title,
      didVote,
      didUpvote: didVote === 1,
      didDownvote: didVote === -1
    };
  }

  static existingVote({ user, votes }) {
    const existingVote =
      user && votes && votes.find(vote => vote.user === user.id);
    return existingVote ? existingVote.vote : 0;
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.score !== nextProps.score) {
      const didVote = PostVote.existingVote(nextProps);
      this.setState({
        score: nextProps.score,
        didVote,
        didUpvote: didVote === 1,
        didDownvote: didVote === -1
      });
    } else if (this.props.token !== nextProps.token && !nextProps.token) {

      console.log("-is this the problem?");

      this.setState({
        didVote: false,
        didUpvote: false,
        didDownvote: false
      });
    }
  }

  castVote(vote) {
    const { attemptVote, id, token } = this.props;
    if (token) {
      attemptVote(id, vote);
      this.setState({
        score: this.state.score + vote - this.state.didVote,
        didVote: vote,
        didUpvote: vote === 1,
        didDownvote: vote === -1
      });
    }
  }

  upvote = () => this.castVote(this.state.didUpvote ? 0 : 1);

  downvote = () => this.castVote(this.state.didDownvote ? 0 : -1);

  render() {

    /*
    return (
      <React.Fragment>
        <Grid spacing={8}>
          { exerciseResults.map((item, i) => (
            <Grid item xs={12}>
              <Card square elevation="0" style={{backgroundColor: 'transparent'}}>
                <CardContent>
                  <Typography className={classes.historyTitle} color="textPrimary" variant="h3">{item.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )) }
        </Grid>
      </React.Fragment>
    );
    */

    const {classes} = this.props;

        /*
          <Grid item xs={1}>
            <Wrapper>
              <PostVoteUpvote
                canVote={!!this.props.token}
                didVote={this.state.didUpvote}
                onClick={this.upvote}
                onDoubleClick={this.downvote}
              />
              <span>
                {this.state.score}
              </span>
              <PostVoteDownvote
                canVote={!!this.props.token}
                didVote={this.state.didDownvote}
                onClick={this.downvote}
              />
            </Wrapper>
          </Grid>
        */

    let title = classes.historyTitle;

    if (this.state.score > 0) title = classes.historyTitleUpvote;
    if (this.state.score < 0) title = classes.historyTitleDownvote;
    if (this.props.id === null) title = classes.historyTitleNovote;

    if (this.props.id) {

      return (
        <Grid item className={classes.wordHistoryWrapper}>
          <PostVoteUpvote
            canVote={!!this.props.token}
            didVote={this.state.didUpvote}
            onClick={this.upvote}
          />
          <Typography
            className={title}
            color="textPrimary"
            variant="h4">
            {this.state.title}
          </Typography>
          <PostVoteDownvote
            canVote={!!this.props.token}
            didVote={this.state.didDownvote}
            onClick={this.downvote}
          />
        </Grid>
      );

    } else {

      return (
        <Grid item className={classes.wordHistoryWrapper}>
          <Typography
            className={title}
            color="textPrimary"
            variant="h4">
            {this.state.title}
          </Typography>
        </Grid>
      );

    }

  }
}

const PostVoteWrapped = withStyles(styles)(PostVote);

export default PostVoteWrapped;
