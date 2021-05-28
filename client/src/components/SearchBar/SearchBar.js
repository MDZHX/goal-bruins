import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SubmitButton from '../SubmitButton/SubmitButton';

import './SearchBar.css';

function SearchBar({ fetchSearchResults }) {
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults(keyword);
  }

  return (
    <form onSumbit={handleSubmit} className="search-form">
      <input
        type="search"
        id="search-keyword"
        name="search-keyword"
        value={keyword}
        placeholder="Search"
        onChange={handleKeywordChange}
        required
      />
      
      <SubmitButton>
        <Link to="/search" style={{ textDecoration: 'none' }}>
          <i className="fas fa-search"></i>
        </Link>
      </SubmitButton>
    </form>
  );
}

export default SearchBar;
