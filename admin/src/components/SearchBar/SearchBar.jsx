import React, { useState } from 'react';
import './SearchBar.css';
import { useDispatch } from 'react-redux'
import { productSearch } from '../../redux/features/product.slice';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(productSearch(query))
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-bar-form">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="search-input"
          placeholder="Search..."
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;