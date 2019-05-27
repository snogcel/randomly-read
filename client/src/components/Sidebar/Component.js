import React from 'react';
import styled from 'styled-components/macro';
import SidebarCategoryList from './CategoryList';


import 'react-awesome-button/dist/styles.css';

/* const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 240px;
  margin: 12px 12px;
`; */

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  flex-basis: 240px;
  margin-left: 24px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 2px;
  background-color: ${props => props.theme.foreground};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = ({ token }) => (
  <Wrapper>
    <SidebarCategoryList />
  </Wrapper>
);

export default Sidebar;
