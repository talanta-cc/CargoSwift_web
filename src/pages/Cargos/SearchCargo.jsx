// Search.js
import React, { useState } from 'react';
import './SearchCargo.css'; 

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query); 
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                placeholder="Search for cargos"
                value={query}
                onChange={handleInputChange}
                className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
        </form>
    );
};

export default Search;
