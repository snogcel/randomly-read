import React from 'react';
import styled from 'styled-components/macro';
import PostVoteContainer from './Vote/Container';
import PostContent from './Content';
import Grid from '@material-ui/core/Grid';
import WordHistoryListItem from "../WordHistoryList/Component";

const WordHistory = function({ wordid, id, votes, score, comments, full, title, type, ...content }) {

  if (type === "sentence") {

    let sentence = [];

    for (let i = 0; i < title.length; i++) {
      sentence.push(<PostVoteContainer key={title[i].id} wordid={title[i].wordid} id={title[i].id} votes={title[i].votes} score={title[i].score} title={title[i].title}/>);
    }

    return (
      <Grid container spacing={1} justify="center">
        {sentence}
      </Grid>
    )

  } else {

    return (
      <PostVoteContainer key={id} wordid={wordid} id={id} votes={votes} score={score} title={title}/>
    )

  }
};

export default WordHistory;
