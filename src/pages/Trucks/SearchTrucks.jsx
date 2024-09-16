import React, { useState } from "react";
import './TrucksPage.css';

const SearchTrucks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("search", searchTerm);

    try {
      const response = await fetch(
        "https://cargoswift.talantacomputerschool.com/api/vehicles",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response:", data);
      setResults(data.data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results. Please try again.");
    }
  };

  return (
    <div className="search-container">
      {/* <h2>Search Trucks</h2> */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search Trucks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {results.length > 0 && (
        <ul>
          {results.map((truck) => (
            <li key={truck.id}>
              <h3>{truck.name}</h3>
              <p>Type: {truck.type}</p>
              <p>Tonnage: {truck.tonnage}</p>
              <p>Registration: {truck.registration_number}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchTrucks;
