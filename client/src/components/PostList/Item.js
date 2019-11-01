import React from 'react';
import styled from 'styled-components/macro';
import Post from '../Post';

const Item = styled.li`
  :not(:first-child) {
    border-top: 1px solid ${props => props.theme.border};
  }
`;

const PostListItem = props => (
  <>{ (props.score > 0) ? <Item><Post {...props} /></Item> : null }</>
);

export default PostListItem;
