import React, { useState } from 'react';
import './SearchBar.css';
import { useDispatch } from 'react-redux'
import { productSearch } from '../../redux/features/product.slice';
import { searchUserDetail } from '../../redux/features/user.slice';
import { searchComplaint } from '../../redux/features/complaint.slice';
const SearchBar = ({type}) => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('entered')
    if(type==="productSearch") dispatch(productSearch(query))
    else if(type==="searchUserDetail") dispatch(searchUserDetail(query))
    else if(type==="searchComplaint") dispatch(searchComplaint(query))
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
      <button className="search-button">All</button>
    </div>
  );
};

export default SearchBar;