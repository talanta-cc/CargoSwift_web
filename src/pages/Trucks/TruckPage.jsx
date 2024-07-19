import React, { useState } from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import './TrucksPage.css';


const TruckPage = ({ truck, onSelect, google }) => {
    const [showLocation, setShowLocation] = useState(false);
    const location = useGeoLocation();

    const handleSelect = (truck) => {
        onSelect(truck);
        setShowLocation(true);
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
                    <button id='truck_btn' onClick={() => handleSelect(truck)}>Select</button>
                </div>
            </div>
            {showLocation && (
                <div className="location-info">
                    <div className="location-details">
                        {location.loaded ? (
                            location.error ? (
                                <div>Error: {location.error.message}</div>
                            ) : (
                                <div>
                                    <h2>Your Location</h2>
                                    <p>Latitude: {location.coordinates.lat}</p>
                                    <p>Longitude: {location.coordinates.lng}</p>
                                </div>
                            )
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                    <div className="google-map">
                        <Map
                            google={google}
                            zoom={14}
                            initialCenter={{
                                lat: location.coordinates.lat,
                                lng: location.coordinates.lng
                            }}
                        >
                            <Marker
                                position={{
                                    lat: location.coordinates.lat,
                                    lng: location.coordinates.lng
                                }}
                            />
                        </Map>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
})(TruckPage);
