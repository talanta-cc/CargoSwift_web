import React, { useState } from 'react';


const SearchTrucks = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="search-trucks">
            <input 
                type="text" 
                placeholder="Search trucks..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchTrucks;
