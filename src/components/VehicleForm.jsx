import React, { useState } from 'react';

const VehicleForm = ({ onAddVehicle }) => {
  const [vehicle, setVehicle] = useState({
    name: '',
    registration_number: '',
    image: '',
    tonnage: '',
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({
      ...vehicle,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setVehicle((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddVehicle(vehicle);
  };

  return (
    <div className="vehicle-form">
      <h2>Add a Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={vehicle.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Registration Number:</label>
          <input
            type="text"
            name="registration_number"
            value={vehicle.registration_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} required />
        </div>
        <div className="form-group">
          <label>Tonnage:</label>
          <input
            type="number"
            name="tonnage"
            value={vehicle.tonnage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={vehicle.type}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default VehicleForm;
