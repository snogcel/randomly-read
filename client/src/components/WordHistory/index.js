import React from 'react';
import styled from 'styled-components/macro';
import PostVoteContainer from './Vote/Container';
import PostContent from './Content';

const WordHistory = ({ id, votes, score, comments, full, title, ...content }) => (
  <React.Fragment>
    <PostVoteContainer id={id} votes={votes} score={score} title={title} />
  </React.Fragment>
);

export default WordHistory;
