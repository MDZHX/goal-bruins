import React from 'react';

import Button from '../Button/Button';

import './Search.css';

function Search(props) {
  return (
    <form className="search-form">
      <input type="search" placeholder="Search"></input>
      <Button onClick={props.onClick}>
        <i className="fas fa-search"></i>
      </Button>
    </form>
  );
}

export default Search;
