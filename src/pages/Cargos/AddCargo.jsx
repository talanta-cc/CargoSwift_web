import React, { useState } from 'react';

const AddCargo = ({ senderID }) => {
    const [cargoData, setCargoData] = useState({
        receiverID: '',
        sender_location: '',
        sender_latitude: '',
        sender_longitude: '',
        receiver_name: '',
        receiver_phone: '',
        receiver_location: '',
        estimated_size: '',
        description: '',
        images: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCargoData({ ...cargoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://cargoswift.talantacomputerschool.com/api/cargos/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...cargoData, senderID }),
            });
            const result = await response.json();
            console.log('Cargo added:', result);
        } catch (error) {
            console.error('Error adding cargo:', error);
        }
    };

    return (
        <div className="add-cargo">
            <h2>Add Cargo</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="receiverID" value={cargoData.receiverID} onChange={handleChange} placeholder="Receiver ID" />
                <input type="text" name="sender_location" value={cargoData.sender_location} onChange={handleChange} placeholder="Sender Location" />
                <input type="text" name="sender_latitude" value={cargoData.sender_latitude} onChange={handleChange} placeholder="Sender Latitude" />
                <input type="text" name="sender_longitude" value={cargoData.sender_longitude} onChange={handleChange} placeholder="Sender Longitude" />
                <input type="text" name="receiver_name" value={cargoData.receiver_name} onChange={handleChange} placeholder="Receiver Name" />
                <input type="text" name="receiver_phone" value={cargoData.receiver_phone} onChange={handleChange} placeholder="Receiver Phone" />
                <input type="text" name="receiver_location" value={cargoData.receiver_location} onChange={handleChange} placeholder="Receiver Location" />
                <input type="text" name="estimated_size" value={cargoData.estimated_size} onChange={handleChange} placeholder="Estimated Size" />
                <textarea name="description" value={cargoData.description} onChange={handleChange} placeholder="Description" />
                <input type="file" name="images" multiple onChange={(e) => setCargoData({ ...cargoData, images: [...e.target.files] })} />
                <button type="submit">Add Cargo</button>
            </form>
        </div>
    );
};

export default AddCargo;
