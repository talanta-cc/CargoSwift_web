import React, { useContext, useState } from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';
import { UserContext } from '../../App';
import { DATAURLS } from '../../utils';
import { useNavigate } from 'react-router-dom';


const AddCargo = ({ loginInfo }) => {
    const {user,setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [cargoDetails, setCargoDetails] = useState({
        title: '',
        senderID: user?.id,
        sender_location:"",
        sender_latitude: '',
        sender_longitude: '',
        estimated_size: '',
        description: '',
        image: null,
        receiver_name: '',
        receiver_phone: '',
        receiver_location: '',
        receiver_id: '',
        receiver_latitude: '',
        receiver_longitude: '',
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
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error('User is not logged in');
            return;
        }

        const newCargo = {
            senderID: user.id,
            ...cargoDetails,
            sender_latitude: location.coordinates.latitude,
            sender_longitude: location.coordinates.longitude,
        };

        const formData = new FormData();
        for (const key in newCargo) {
            formData.append(key, newCargo[key]);
        }
        if (cargoDetails.image) {
            formData.append('image', cargoDetails.image);
        }

        try {
            const request = await fetch(DATAURLS.URLS.addCargo, {
                method: 'POST',
                body: formData,
            });

            if (!request.ok) {
                throw new Error(`HTTP error! Status: ${request.status}`);
            }

            const response = await request.json();
            if(!response.error){
                navigate("/user-cargos");
            }
            console.log('Cargo added successfully:', response);
        } catch (error) {
            console.error('Error adding cargo:', error);
        }
    };

    return (
        <form className="add-cargo-form" onSubmit={handleSubmit}>
            <h2>Add Cargo</h2>
            <input
                type="text"
                name="title"
                value={cargoDetails.title}
                onChange={handleChange}
                placeholder="Cargo Name"
                required
            />
            <input
                type="text"
                name="sender_location"
                value={cargoDetails.sender_location}
                onChange={handleChange}
                placeholder="Cargo Location (leave blank to use current location)"
            />
            <select
                name="measurement_unit"
                value={cargoDetails.measurement_unit}
                onChange={handleChange}
            >
                <option value="kg">Kilograms</option>
                <option value="tonnes">Tonnes</option>
                <option value="litres">Litres</option>
            </select>
            <input
                type="text"
                name="estimated_size"
                value={cargoDetails.estimated_size}
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
                name="images"
                
                onChange={handleImageChange}
                accept="image/*"
            />
            <input
                type="text"
                name="receiver_name"
                value={cargoDetails.receiver_name}
                onChange={handleChange}
                placeholder="Receiver Name"
                required
            />
            <input
                type="text"
                name="receiver_phone"
                value={cargoDetails.receiver_phone}
                onChange={handleChange}
                placeholder="Receiver Phone"
                required
            />
            <input
                type="text"
                name="receiver_location"
                value={cargoDetails.receiver_location}
                onChange={handleChange}
                placeholder="Receiver Location"
            />
            <button type="submit">Add Order</button>
        </form>
    );
};

export default AddCargo;
