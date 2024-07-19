import React, { useEffect, useState } from 'react';
import './Cargopage.css';

const UserCargos = ({ userId }) => {
    const [cargos, setCargos] = useState([]);

    useEffect(() => {
        const fetchCargos = async () => {
            try {
                const response = await fetch(`https://cargoswift.talantacomputerschool.com/api/cargos/cargos-own/${userId}`);
                const data = await response.json();
                setCargos(data);
            } catch (error) {
                console.error("Error fetching user cargos:", error);
            }
        };
        fetchCargos();
    }, [userId]);

    return (
        <div>
            <h2>My Cargos</h2>
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

export default UserCargos;
