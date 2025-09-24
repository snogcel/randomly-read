import React from 'react';
import styled from 'styled-components/macro';
import { useParams, useLocation } from 'react-router-dom';
import CategoryMenuDropdown from './Dropdown';
import CategoryMenuCreatePostButton from './CreatePostButton';

const Menu = styled.nav`
  display: none;
  border: 1px solid ${props => props.theme.border};
  border-left: none;
  border-right: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const CategoryMenu = props => {
  const params = useParams();
  const location = useLocation();
  
  const category = params.category || 'all';
  
  return (
    <Menu>
      <CategoryMenuDropdown
        category={category}
        location={location}
      />
      {props.token && <CategoryMenuCreatePostButton />}
    </Menu>
  );
};

export default CategoryMenu;
