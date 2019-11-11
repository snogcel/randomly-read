import React from 'react';
import styled from 'styled-components/macro';
import HeaderLogo from './Logo';
import HeaderDarkButtonContainer from './DarkButton/Container';
import HeaderUsername from './Username';
import HeaderNavLink from './NavLink';

const Wrapper = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: stretch;
  margin-bottom: 24px;
  border-bottom: 1px solid ${props => props.theme.border};
  height: 48px;
  padding: 0 10vw;
  background-color: ${props => props.theme.foreground};
  user-select: none;

  @media (max-width: 425px) {
    margin-bottom: 16px;
    height: 40px;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

/*

<HeaderNavLink to='/Interactions'>Interactions</HeaderNavLink>

 */

const Header = ({ user, logout }) => (
  <Wrapper>
    <HeaderLogo />
    {user ? (
      <>
        <HeaderNavLink to='/RandomlyRead'>Randomly Read</HeaderNavLink>
        <HeaderNavLink to='/Administration'>Administration</HeaderNavLink>
        <HeaderNavLink to='/RoutineBuilder'>Routine Builder</HeaderNavLink>
        <HeaderNavLink as='span' onClick={logout}>Log Out</HeaderNavLink>
      </>
    ) : (
      <>
        <HeaderNavLink to='/login'>Log In</HeaderNavLink>
      </>
    )}
  </Wrapper>
);

export default Header;
