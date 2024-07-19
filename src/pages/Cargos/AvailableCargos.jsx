import React, { useEffect, useState } from 'react';
import './Cargopage.css';

const AvailableCargos = ({ latitude, longitude }) => {
    const [cargos, setCargos] = useState([]);

    useEffect(() => {
        const fetchCargos = async () => {
            try {
                const response = await fetch(`https://cargoswift.talantacomputerschool.com/api/cargos/home/35786/2152`);
                const data = await response.json();
                setCargos(data);
            } catch (error) {
                console.error("Error fetching cargos:", error);
            }
        };
        fetchCargos();
    }, [latitude, longitude]);

    return (
        <div>
            <h2>Available Cargos</h2>
            {cargos.length ? (
                cargos.map(cargo => (
                    <div key={cargo.id}>
                        <h3>{cargo.description}</h3>
                        <p>{cargo.estimated_size}</p>
                    </div>
                ))
            ) : (
                <p>No available cargos</p>
            )}
        </div>
    );
};

export default AvailableCargos;
