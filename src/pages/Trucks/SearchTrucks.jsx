import React, { useState } from "react";
import './TrucksPage.css';

const SearchTrucks = ({ query, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(query);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm); 
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search Trucks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchTrucks;
