import React, { useState } from 'react';
import './TrucksPage.css';

function TrucksPage() {
  const [filters, setFilters] = useState({
    classic: false,
    couch: false,
    'ac-vehicle': false,
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFilters({
      ...filters,
      [value]: checked,
    });
  };

  const truckData = [
    {
      name: 'Truck 1',
      type: 'classic',
      description: 'Classic Truck description and specifications.',
      time: '8.00am - 4.30pm',
      offDays: 'Friday',
    },
    {
      name: 'Truck 2',
      type: 'couch',
      description: 'Couch Truck description and specifications.',
      time: '9.00am - 5.00pm',
      offDays: 'Saturday',
    },
    {
      name: 'Truck 3',
      type: 'ac-vehicle',
      description: 'AC Vehicle description and specifications.',
      time: '8.00am - 4.30pm',
      offDays: 'Friday',
    },
  ];

  const filteredTrucks = truckData.filter(truck => filters[truck.type]);

  return (
    <div className="trucks-page">
      <div className="journey-details">
        <div className="journey-input">
          <label htmlFor="pickup-point">Pickup Point</label>
          <input type="text" id="pickup-point" placeholder="Enter pickup point" />
        </div>
        <div className="journey-input">
          <label htmlFor="dropping-point">Dropping Point</label>
          <input type="text" id="dropping-point" placeholder="Enter dropping point" />
        </div>
        <div className="journey-input">
          <label htmlFor="date-of-journey">Date of Journey</label>
          <input type="date" id="date-of-journey" />
        </div>
      </div>

      <div className="trucks-page-content">
        <div className="filters">
          <div className="filter1">
          <h2>Filter by Type </h2> 
          <p>Reset All</p>
          </div><hr />
          <h2>Vehicle Type</h2>
          <label>
            <input
              type="checkbox"
              value="classic"
              className="vehicle-type-checkbox"
              onChange={handleCheckboxChange}
            /> Classic
          </label>
          <label>
            <input
              type="checkbox"
              value="couch"
              className="vehicle-type-checkbox"
              onChange={handleCheckboxChange}
            /> Couch
          </label>
          <label>
            <input
              type="checkbox"
              value="ac-vehicle"
              className="vehicle-type-checkbox"
              onChange={handleCheckboxChange}
            /> AC-vehicle
          </label>
        </div>

        <div className="main-content">
          <div className="controls">
            <input type="text" id="search-input" placeholder="Search trucks..." />
            <select id="sort-select">
              <option value="name-asc">Sort by Name (A-Z)</option>
              <option value="name-desc">Sort by Name (Z-A)</option>
            </select>
            <button id="filter-button">Filter</button>
          </div>

          <div className="trucks-container" id="trucks-container">
            {(filteredTrucks.length > 0 ? filteredTrucks : truckData).map((truck, index) => (
              <div className="truck-card" key={index} data-name={truck.name} data-type={truck.type}>
                <div className="trucks_names">
                <h2>{truck.name}</h2>
                </div>
                {filters[truck.type] && (
                  <>
                    <p>{truck.description}</p>
                    <p><strong>Time:</strong> {truck.time}</p>
                    <p><strong>Off Days:</strong> {truck.offDays}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrucksPage;

