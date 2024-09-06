import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cargopage.css'; 

const CargoPage = ({ userId }) => {
    const [cargos, setCargos] = useState([]);
    const navigate = useNavigate();

    const fetchAvailableCargos = useCallback(async () => {
        try {
            const response = await fetch(`https://cargoswift.talantacomputerschool.com/api/cargos/cargos-own/${userId}`);
            const data = await response.json();
            setCargos(data);
        } catch (error) {
            console.error('Error fetching cargos:', error);
        }
    }, [userId]);

    useEffect(() => {
        fetchAvailableCargos();
    }, [fetchAvailableCargos]);

    const handleAddCargo = () => {
        navigate('/add-cargo');
    };

    return (
        <div className="cargo-page">
            <h2>My Cargos</h2>
            <button onClick={handleAddCargo} className="add-cargo-button">Add Cargo</button>
            {cargos.length ? (
                cargos.map(cargo => (
                    <div key={cargo.id} className="cargo-item">
                        <h3>{cargo.description}</h3>
                        <p>Estimated Size: {cargo.estimated_size} {cargo.measurement_unit}</p>
                        <p>Location: {cargo.cargoLocation}</p>
                        <p>Receiver: {cargo.receiverName}, {cargo.receiverPhone}</p>
                    </div>
                ))
            ) : (
                <p>No cargos available at the moment.</p>
            )}
        </div>
    );
};

export default CargoPage;
