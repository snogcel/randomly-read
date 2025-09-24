import React from 'react';
import styled from 'styled-components/macro';
import { Route, Routes } from 'react-router-dom';
import HomeMainSection from './MainSection';
import CategoryMenuContainer from '../CategoryMenu/Container';
import PostListContainer from '../PostList/Container';
import PostDetailContainer from '../PostDetail/Container';
import SidebarContainer from '../Sidebar/Container';
import RRLayout from '../RRLayout/RRHomeContainer';
import UserHomeContainer from '../UserHome/Container';
import Empty from '../shared/Empty';

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

/*


      <Route exact path='/' component={Empty} />



      <Route
        exact
        path='/a/:category'
        render={({ match }) => (
          <PostListContainer category={match.params.category} />
        )}
      />
      <Route
        exact
        path='/u/:username'
        render={({ match }) => (
          <PostListContainer username={match.params.username} />
        )}
      />
      <Route
        exact
        path='/a/:category/:post'
        render={({ match, history }) => (
          <PostDetailContainer id={match.params.post} history={history} />
        )}
      />

 */

const Home = () => (

  <HomeMainSection>

    <Routes>
      <Route path='/' element={<UserHomeContainer />} />
    </Routes>

  </HomeMainSection>

);

export default Home;
