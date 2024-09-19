import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cargopage.css'; 
import { DATAURLS } from '../../utils';
import useGeoLocation from '../../hooks/useGeoLocation';
import Search from './SearchCargo';

const CargoPage = () => {
    const [cargos, setCargos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useGeoLocation();

    const fetchAvailableCargos = useCallback(async () => {
        if (!location.loaded || location.error) {
            setLoading(false);
            setError('Failed to get location.');
            return;
        }

        try {
            const response = await fetch(`${DATAURLS.URLS.cargos}/${location.coordinates.latitude}/${location.coordinates.longitude}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('API Response:', data);
            setCargos(data.data || []); 
        } catch (error) {
            console.error('Error fetching cargos:', error);
            setError('Failed to fetch cargos.');
        } finally {
            setLoading(false);
        }
    }, [location]);

    useEffect(() => {
        console.log('Current Location:', location.coordinates);
        if (location.loaded && !location.error) {
            fetchAvailableCargos();
        }
    }, [fetchAvailableCargos, location]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="cargo-page">
            <h2>Available Cargos</h2>
            {cargos.length ? (
                cargos.map(cargo => (
                    <div key={cargo.id} className="cargo-item">
                        <img 
                            style={{
                                width: 200,
                                height: 150,
                                objectFit: "contain",
                            }} 
                            src={`${DATAURLS.BASEURL}/${cargo.image}`} 
                            alt={cargo.description || "Cargo image"}
                        />
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