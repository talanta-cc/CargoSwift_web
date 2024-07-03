import React from 'react';
import "./TrucksPage.css";

const Truck = ({ truck }) => {
  return (
    <div className="item">
      <div className="row">
        <div className="col">
          <h1>{truck.title}</h1>
          <small>{truck.seatLayout}</small>
          <a href="">{truck.type}</a>
        </div>
        <div className="col flex">
          <div className="start">
            <h4>{truck.tripDetails.startTime}</h4>
            <small>{truck.tripDetails.startLocation}</small>
          </div>
          <div className="middle">
            <p>=== </p>
            <small>{truck.tripDetails.duration}</small>
          </div>
          <div className="stop">
            <h4>{truck.tripDetails.arrivalTime}</h4>
            <small>{truck.tripDetails.destinationLocation}</small>
          </div>
        </div>
        <div className="col ">
          <p>$ {truck.tripDetails.price} </p>
          <p>Off Days: <span>{truck.tripDetails.offDays.map((day) => <span key={day}>{day} </span>)}</span></p>
          <button>Select</button>
        </div>
      </div>
    </div>
  );
};

export default Truck;