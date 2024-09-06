import React, { useState } from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';
import './AddTruck.css';

const AddTruck = ({ loginInfo }) => {
    const [truckDetails, setTruckDetails] = useState({
        name: '',
        registration_number: '',
        type: '',
        tonnage: '',
        description: '',
        categoryID: null,
        categoryIndex: null,
        images: null,
    });

    const location = useGeoLocation();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "images") {
            setTruckDetails(prevDetails => ({
                ...prevDetails,
                [name]: files[0], 
            }));
        } else {
            setTruckDetails(prevDetails => ({
                ...prevDetails,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!loginInfo || !loginInfo.userData) {
            console.error('User is not logged in');
            return;
        }

        const newTruck = {
            userID: loginInfo.userData.id,
            ...truckDetails,
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng,
        };

        try {
            const formData = new FormData();
            Object.keys(newTruck).forEach(key => {
                formData.append(key, newTruck[key]);
            });

            const response = await fetch('https://cargoswift.talantacomputerschool.com/api/vehicles/add', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Truck added successfully:', data);
        } catch (error) {
            console.error('Error adding truck:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-truck-form">
            <h2>Add New Truck</h2>
            <input type="text" name="name" value={truckDetails.name} onChange={handleChange} placeholder="Truck Name" />
            <input type="text" name="registration_number" value={truckDetails.registration_number} onChange={handleChange} placeholder="Registration Number" />
            <input type="text" name="type" value={truckDetails.type} onChange={handleChange} placeholder="Type" />
            <input type="text" name="tonnage" value={truckDetails.tonnage} onChange={handleChange} placeholder="Tonnage" />
            <input type="text" name="description" value={truckDetails.description} onChange={handleChange} placeholder="Description" />
            <input type="file" name="images" onChange={handleChange} accept="image/*" />
            <button type="submit">Add Truck</button>
        </form>
    );
};

export default AddTruck;
