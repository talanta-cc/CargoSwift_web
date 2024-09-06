import React, { useState } from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';


const AddCargo = ({ loginInfo }) => {
    const [cargoDetails, setCargoDetails] = useState({
        cargoName: '',
        cargoLocation: '',
        measurementUnit: 'kg',
        estimatedSize: '',
        description: '',
        cargoImage: null,
        receiverName: '',
        receiverPhone: '',
        receiverLocation: '',
    });

    const location = useGeoLocation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCargoDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setCargoDetails(prevDetails => ({
            ...prevDetails,
            cargoImage: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!loginInfo || !loginInfo.userData) {
            console.error('User is not logged in');
            return;
        }

        const newCargo = {
            userID: loginInfo.userData.id,
            ...cargoDetails,
            cargoLocation: cargoDetails.cargoLocation || `${location.coordinates.lat},${location.coordinates.lng}`,
        };

        const formData = new FormData();
        for (const key in newCargo) {
            formData.append(key, newCargo[key]);
        }
        if (cargoDetails.cargoImage) {
            formData.append('cargoImage', cargoDetails.cargoImage);
        }

        try {
            const response = await fetch('https://your-api-endpoint.com/api/cargos/add', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Cargo added successfully:', data);
        } catch (error) {
            console.error('Error adding cargo:', error);
        }
    };

    return (
        <form className="add-cargo-form" onSubmit={handleSubmit}>
            <h2>Add Cargo</h2>
            <input
                type="text"
                name="cargoName"
                value={cargoDetails.cargoName}
                onChange={handleChange}
                placeholder="Cargo Name"
                required
            />
            <input
                type="text"
                name="cargoLocation"
                value={cargoDetails.cargoLocation}
                onChange={handleChange}
                placeholder="Cargo Location (leave blank to use current location)"
            />
            <select
                name="measurementUnit"
                value={cargoDetails.measurementUnit}
                onChange={handleChange}
            >
                <option value="kg">Kilograms</option>
                <option value="tonnes">Tonnes</option>
                <option value="litres">Litres</option>
            </select>
            <input
                type="text"
                name="estimatedSize"
                value={cargoDetails.estimatedSize}
                onChange={handleChange}
                placeholder="Estimated Size (optional)"
            />
            <textarea
                name="description"
                value={cargoDetails.description}
                onChange={handleChange}
                placeholder="Description"
                rows="4"
            />
            <input
                type="file"
                name="cargoImage"
                onChange={handleImageChange}
                accept="image/*"
            />
            <input
                type="text"
                name="receiverName"
                value={cargoDetails.receiverName}
                onChange={handleChange}
                placeholder="Receiver Name"
                required
            />
            <input
                type="text"
                name="receiverPhone"
                value={cargoDetails.receiverPhone}
                onChange={handleChange}
                placeholder="Receiver Phone"
                required
            />
            <input
                type="text"
                name="receiverLocation"
                value={cargoDetails.receiverLocation}
                onChange={handleChange}
                placeholder="Receiver Location"
            />
            <button type="submit">Add Order</button>
        </form>
    );
};

export default AddCargo;
