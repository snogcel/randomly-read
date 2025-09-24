import React from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import categories from '../../categories';
import SelectWrapper from '../shared/form/SelectWrapper';

const Dropdown = styled.select`
  border: none;
  border-radius: 0;
  width: 100%;
  padding: 8px 16px;
  background-color: ${props => props.theme.foreground};
  font-size: 15px;
  color: ${props => props.theme.normalText};
  appearance: none;
`;

const CategoryMenuDropdown = (props) => {
  const navigate = useNavigate();

  const mapCategories = () =>
    ['all', ...categories].map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
    ));

  const handleOnChange = (event) => {
    const category = event.target.value;
    if (category !== props.category) {
      const url = category === 'all' ? '/' : `/a/${category}`;
      navigate(url);
    }
  };

  return (
    <SelectWrapper flex>
      <Dropdown value={props.category} onChange={handleOnChange}>
        {mapCategories()}
      </Dropdown>
    </SelectWrapper>
  );
};

export default CategoryMenuDropdown;
