import React, { useState, useEffect } from 'react';
import PostVoteUpvote from './Upvote';
import PostVoteDownvote from './Downvote';

import { useTheme } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styles } from '../../../themeHandler';

function PostVote(props) {
  const theme = useTheme();
  const classes = styles(theme);
  
  const existingVote = (user, votes) => {
    const existingVote =
      user && votes && votes.find(vote => vote.user === user.id);
    return existingVote ? existingVote.vote : 0;
  };

  const didVote = existingVote(props.user, props.votes);
  const [state, setState] = useState({
    score: props.score,
    title: props.title,
    didVote,
    didUpvote: didVote === 1,
    didDownvote: didVote === -1
  });

  useEffect(() => {
    if (props.score !== state.score) {
      const didVote = existingVote(props.user, props.votes);
      setState(prevState => ({
        ...prevState,
        score: props.score,
        didVote,
        didUpvote: didVote === 1,
        didDownvote: didVote === -1
      }));
    } else if (!props.token) {
      setState(prevState => ({
        ...prevState,
        didVote: false,
        didUpvote: false,
        didDownvote: false
      }));
    }
  }, [props.score, props.token, props.user, props.votes, state.score]);

  const castVote = (vote) => {
    const { attemptVote, id, token } = props;
    if (token) {
      attemptVote(id, vote);
      setState(prevState => ({
        ...prevState,
        score: prevState.score + vote - prevState.didVote,
        didVote: vote,
        didUpvote: vote === 1,
        didDownvote: vote === -1
      }));
    }
  };

  const upvote = () => castVote(state.didUpvote ? 0 : 1);
  const downvote = () => castVote(state.didDownvote ? 0 : -1);

  const { user } = props;

  let titleClass = classes.historyTitle;

  if (state.score > 0) titleClass = classes.historyTitleUpvote;
  if (state.score < 0) titleClass = classes.historyTitleDownvote;
  if (props.id === null) titleClass = classes.historyTitleNovote;

  if (typeof(user) !== "undefined" && props.wordid && props.user.isActive) {
    return (
      <Grid item className={classes.wordHistoryWrapper}>
        <PostVoteUpvote
          canVote={!!props.token}
          didVote={state.didUpvote}
          onClick={upvote}
        />
        <Typography
          className={titleClass}
          color="textPrimary"
          variant="h5">
          {state.title}
        </Typography>
        <PostVoteDownvote
          canVote={!!props.token}
          didVote={state.didDownvote}
          onClick={downvote}
        />
      </Grid>
    );
  } else {
    return (
      <Grid item className={classes.wordHistoryWrapper}>
        <Typography
          className={titleClass}
          color="textPrimary"
          variant="h5">
          {state.title}
        </Typography>
      </Grid>
    );
  }
}

export default PostVote;
