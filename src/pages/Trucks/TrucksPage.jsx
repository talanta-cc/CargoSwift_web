import React, { useState, useEffect } from 'react';
import './TrucksPage.css';
import Truck from './TruckPage';

const Trucks = () => {
  const [trucks] = useState([
  ]);

  const [pickup, setPickup] = useState('Pickup Point');
  const [droppingPoint, setDroppingPoint] = useState('Dropping Point');
  const [date, setDate] = useState('');
  const [typeAC, setTypeAC] = useState(false);
  const [typeClassic, setTypeClassic] = useState(false);
  const [typeCoach, setTypeCoach] = useState(false);
  const [filteredTrucks, setFilteredTrucks] = useState(trucks);

  const handleFilterChange = (type, checked) => {
    switch (type) {
      case 'AC':
        setTypeAC(checked);
        break;
      case 'Classic':
        setTypeClassic(checked);
        break;
      case 'Coach':
        setTypeCoach(checked);
        break;
      default:
        break;
    }
  };

  const filterTrucks = () => {
    let updatedTrucks = trucks.filter(truck => {
      const matchPickup = pickup === 'Pickup Point' || truck.tripDetails.startLocation.includes(pickup);
      const matchDrop = droppingPoint === 'Dropping Point' || truck.tripDetails.destinationLocation.includes(droppingPoint);
      const matchDate = date === '' || truck.tripDetails.startTime.includes(date);
      return matchPickup && matchDrop && matchDate;
    });

    updatedTrucks = updatedTrucks.filter(truck => {
      return (
        (typeAC && truck.type === 'AC') ||
        (typeClassic && truck.type === 'Classic') ||
        (typeCoach && truck.type === 'Coach') ||
        (!typeAC && !typeClassic && !typeCoach)
      );
    });

    setFilteredTrucks(updatedTrucks);
  };

  useEffect(() => {
    filterTrucks();
  }, [pickup, droppingPoint, date, typeAC, typeClassic, typeCoach]);

  const submitForm = (e) => {
    e.preventDefault();
    filterTrucks();
  };

  return (
    <div className='container'>
      <div className='header'>
        <form onSubmit={submitForm}>
          <select name="pickup-point" onChange={e => setPickup(e.target.value)} value={pickup}>
            <option value="Pickup Point">--Pickup Point--</option>
            <option value="California">California</option>
            <option value="Washington DC">Washington DC</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Dakota">Dakota</option>
            <option value="Kansas">Kansas</option>
          </select>

          <select name="Dropping-point" value={droppingPoint} onChange={e => setDroppingPoint(e.target.value)}>
            <option value="Dropping Point">--Dropping Point--</option>
            <option value="California">California</option>
            <option value="Washington DC">Washington DC</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Texas">Texas</option>
          </select>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <button type='submit'>Find</button>
        </form>
      </div>
      <div className="main">
        <div className="filter">
          <div className="title">
            <h1>Filter</h1>
            <small onClick={() => { setTypeAC(false); setTypeClassic(false); setTypeCoach(false); }}>Reset All</small>
          </div>
          <hr />
          <h4>Vehicle Type</h4>
          <div className="choices">
            <input type="checkbox" checked={typeClassic} onChange={e => handleFilterChange('Classic', e.target.checked)} />
            <label>Classic</label>
          </div>
          <div className="choices">
            <input type="checkbox" checked={typeCoach} onChange={e => handleFilterChange('Coach', e.target.checked)} />
            <label>Coach</label>
          </div>
          <div className="choices">
            <input type="checkbox" checked={typeAC} onChange={e => handleFilterChange('AC', e.target.checked)} />
            <label>AC</label>
          </div>
        </div>
        <div className="data">
          {filteredTrucks.map(truck => (
            <Truck truck={truck} key={truck.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trucks;