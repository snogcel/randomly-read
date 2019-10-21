import React from 'react';
import styled from 'styled-components/macro';
import WordHistory from '../WordHistory';

const WordHistoryListItem = props => (
  <React.Fragment>
      <WordHistory {...props} />
  </React.Fragment>
);

export default WordHistoryListItem;
