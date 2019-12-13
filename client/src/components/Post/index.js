import React from 'react';
import styled from 'styled-components/macro';
import PostVoteContainer from './Vote/Container';
import PostContent from './Content';

const Wrapper = styled.div`
  display: flex;
  height: auto;
  background-color: ${props => props.theme.foreground};
`;

const Post = ({ id, author, action, votes, score, comments, full, ...content }) => (
  <React.Fragment>
    <PostVoteContainer id={id} action={action} author={author} votes={votes} score={score} />
    <PostContent
      showFullPost={full}
      id={id}
      commentCount={comments ? comments.length : 0}
      {...content}
    />
  </React.Fragment>
);

export default Post;
