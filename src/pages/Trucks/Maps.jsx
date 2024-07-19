import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = ({ google }) => (
  <Map
    google={google}
    zoom={14}
    initialCenter={{ lat: -1.2921, lng: 36.8219 }} // Example coordinates for initial center
  >
    <Marker position={{ lat: -1.2921, lng: 36.8219 }} /> {/* Example marker position */}
  </Map>
);

export default GoogleApiWrapper({
  apiKey: 'YOUR_API_KEY_HERE', // Replace with your actual Google Maps API key
})(MapContainer);
