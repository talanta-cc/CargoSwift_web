import React, { useEffect, useState } from 'react';
import './Cargopage.css';

const UserCargos = ({ userId }) => {
    const [cargos, setCargos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCargos = async () => {
            try {
                const response = await fetch(`https://cargoswift.talantacomputerschool.com/api/cargos/cargos-own/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cargos');
                }
                const data = await response.json();
                setCargos(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching user cargos:", error);
            }
        };
        fetchCargos();
    }, [userId]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="user-cargos">
            <h2>My Cargos</h2>
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
                <p>No cargos found</p>
            )}
        </div>
    );
};

export default UserCargos;
