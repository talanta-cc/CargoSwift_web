import React, { useEffect, useState } from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Link, useParams } from 'react-router-dom';
import { DATAURLS } from '../../utils';

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
  const {id} = useParams();

  const location = useGeoLocation();

  // const distance = location.loaded 
  //   ? haversineDistance(location.coordinates, truckCoordinates) 
  //   : null;

  const [item,setItem] = useState({
    loading:false,
    data:null,
    error:false,
    message:""
  });

  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOO0GLE_MAPS_API_KEY,
    libraries: ['geometry', 'drawing'],
  });


  const fetchCargo = async()=>{
    try {
      setItem({...item,loading:true,message:"",error:false});
      let request = await fetch(`${DATAURLS.URLS.viewTruck}/${id}`);
      let response = await request.json();
      console.log(response);
      setItem({...response,loading:false});
      
    } catch (error) {
      setItem({...item,loading:false,message:"",error:false});
    }
  }

  useEffect(()=>{
    fetchCargo();
  },[]);

  return (
    <>
      {isLoaded? (
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat:location.coordinates.latitude,lng:location.coordinates.longitude}}
            zoom={14}
          >
            <Marker position={{lat:location.coordinates.latitude,lng:location.coordinates.longitude}} label="You" />
            <Marker position={truckCoordinates} label="Truck" />
          </GoogleMap>
          {
            item.loading?
            <p>Loading...</p>:
            item.error?
            <p>{item.message}</p>:
            item.data?
            <div>
              <img src={`${DATAURLS.BASEURL}${item.data?.image}`} />
              <p>{item.data?.name}</p>
              <a href={`tel:${item.data?.phone}`}>Call : {item.data?.phone}</a><br></br>
              <a href={`mailto:${item.data?.email}`}>Email : {item.data?.email}</a>
              <p>Distance from truck : {item.data?.distance}</p>
              <Link to={"/add-cargo"}>
                <button >Add Shipment</button>
            </Link>
            </div>:
            <p>Truck not found.</p>
          }
          
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default MapPage;

