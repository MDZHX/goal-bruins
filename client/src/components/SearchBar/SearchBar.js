import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';

import './SearchBar.css';

function SearchBar({ fetchSearchResults }) {
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <form className="search-form">
      <input
        type="search"
        id="search-keyword"
        name="search-keyword"
        value={keyword}
        placeholder="Search"
        onChange={handleKeywordChange}
        required
      />
      
      <Button onClick={() => { fetchSearchResults(keyword); }}>
        <Link to="/search" style={{ textDecoration: 'none' }}>
          <i className="fas fa-search"></i>
        </Link>
      </Button>
    </form>
  );
}

export default SearchBar;
