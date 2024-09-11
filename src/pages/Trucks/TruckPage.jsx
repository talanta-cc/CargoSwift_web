import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './TrucksPage.css';

const TruckPage = ({ truck }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/map/${truck.id}`);
  };

  return (
    <div className="item">
      <div className="row">
        <div className="col">
          <h1>{truck.name}</h1>
          <small>{truck.seatLayout}</small>
          <button>{truck.type}</button>
        </div>
        <div className="col flex">
          <div className="start">
            <h4>{truck.startTime}</h4>
            <small>{truck.startLocation}</small>
          </div>
          <div className="middle">
            <p>===</p>
            <small>{truck.duration}</small>
          </div>
          <div className="stop">
            <h4>{truck.arrivalTime}</h4>
            <small>{truck.destinationLocation}</small>
          </div>
        </div>
        <div className="col">
          <p>$ {truck.price}</p>
          {Array.isArray(truck.offDays) && (
            <p>
              Off Days: <span>{truck.offDays.map(day => <span key={day}>{day} </span>)}</span>
            </p>
          )}
          <button id='truck_btn' onClick={handleSelect}>Select</button>
        </div>
      </div>
    </div>
  );
};

TruckPage.propTypes = {
  truck: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    seatLayout: PropTypes.string,
    type: PropTypes.string,
    startTime: PropTypes.string,
    startLocation: PropTypes.string,
    duration: PropTypes.string,
    arrivalTime: PropTypes.string,
    destinationLocation: PropTypes.string,
    price: PropTypes.number,
    offDays: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
};

export default TruckPage;
