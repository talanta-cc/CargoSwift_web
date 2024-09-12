import React, { useEffect, useState } from 'react';
import './Cargopage.css';

const AvailableCargos = () => {
    const [cargos, setCargos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCargos = async () => {
            try {
                // Fixed API URL without location parameters
                const response = await fetch('https://cargoswift.talantacomputerschool.com/api/cargos/home');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCargos(data.data || []); // Adjust if necessary based on actual response structure
            } catch (error) {
                console.error('Error fetching cargos:', error);
                setError('Failed to fetch cargos.');
            }
        };

        fetchCargos();
    }, []);

    return (
        <div>
            <h2>Available Cargos</h2>
            {error && <p className="error-message">{error}</p>}
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
                <p>No available cargos</p>
            )}
        </div>
    );
};

export default AvailableCargos;
