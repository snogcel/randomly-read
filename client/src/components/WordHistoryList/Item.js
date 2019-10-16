import React from 'react';
import styled from 'styled-components/macro';
import WordHistory from '../WordHistory';

const Item = styled.li`
  :not(:first-child) {
    border-top: 1px solid ${props => props.theme.border};
  }
`;

const WordHistoryListItem = props => (
  <Item>
    <WordHistory {...props} />
  </Item>
);

export default WordHistoryListItem;
