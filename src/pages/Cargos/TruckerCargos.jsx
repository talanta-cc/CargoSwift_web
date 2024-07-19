import React, { useEffect, useState } from 'react';
import './Cargopage.css';

const TruckerCargos = ({ userId }) => {
    const [cargos, setCargos] = useState([]);

    useEffect(() => {
        const fetchCargos = async () => {
            try {
                const response = await fetch(`https://cargoswift.talantacomputerschool.com/api/cargos/trucker-cargos/${userId}`);
                const data = await response.json();
                setCargos(data);
            } catch (error) {
                console.error("Error fetching trucker cargos:", error);
            }
        };
        fetchCargos();
    }, [userId]);

    return (
        <div>
            <h2>Trucker Cargos</h2>
            {cargos.length ? (
                cargos.map(cargo => (
                    <div key={cargo.id}>
                        <h3>{cargo.description}</h3>
                        <p>{cargo.estimated_size}</p>
                    </div>
                ))
            ) : (
                <p>No cargos found</p>
            )}
        </div>
    );
};

export default TruckerCargos;
