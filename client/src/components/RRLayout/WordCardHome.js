import React from 'react';
import styled from 'styled-components/macro';
import WordCardContainer from '../RRLayout/WordCardContainer';
import TimerContainer from '../RRLayout/TimerContainer';


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5vw;
  
  @media (max-width: 1024px) {
    margin: 0 5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 240px;
  margin: 12px 12px;
`;

const WordCardHome = () => (
    <Wrapper>
    <WordCardContainer />
    <TimerWrapper>
    <TimerContainer />
    </TimerWrapper>
    </Wrapper>

  
     
  );
  
  export default WordCardHome;