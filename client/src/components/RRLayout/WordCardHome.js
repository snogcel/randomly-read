import React from 'react';
import styled from 'styled-components/macro';
import WordCardContainer from '../RRLayout/WordCardContainer';
import TimerContainer from '../RRLayout/TimerContainer';


const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10vw;
  
  @media (max-width: 1024px) {
    margin: 0 5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`;

const WordCardHome = () => (
    <Wrapper>
    <WordCardContainer />
    <TimerContainer />
    </Wrapper>

  
     
  );
  
  export default WordCardHome;