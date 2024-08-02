import React from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const truckCoordinates = {
  lat: -1.286389,
  lng: 36.817223
};

const haversineDistance = (coords1, coords2) => {
  if (!coords1 || !coords2) return null;

  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; 
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLng = toRad(coords2.lng - coords1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
};

const MapPage = () => {
  const location = useGeoLocation();

  const distance = location.loaded 
    ? haversineDistance(location.coordinates, truckCoordinates) 
    : null;

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      {location.loaded ? (
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location.coordinates}
            zoom={14}
          >
            <Marker position={location.coordinates} label="You" />
            <Marker position={truckCoordinates} label="Truck" />
          </GoogleMap>
          {/* <p>{truckData.name}</p> */}
          {distance !== null && (
            <p>Distance to truck: {distance.toFixed(2)} km</p>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </LoadScript>
  );
};

export default MapPage;

