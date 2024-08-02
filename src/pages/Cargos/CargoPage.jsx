import React, { useState, useEffect } from 'react';
import AvailableCargos from './AvailableCargos';
import UserCargos from './UserCargos';
import TruckerCargos from './TruckerCargos';
import AddCargo from './AddCargo';

const CargoPage = ({ userId, latitude, longitude }) => {
    const [cargos, setCargos] = useState([]);

    useEffect(() => {
        fetchAvailableCargos();
    }, []);

    const fetchAvailableCargos = async () => {
        try {
            const response = await fetch(`https://cargoswift.talantacomputerschool.com/api/cargos/home/${latitude}/${longitude}`);
            const data = await response.json();
            setCargos(data);
        } catch (error) {
            console.error('Failed to fetch cargos:', error);
        }
    };

    const handleAddCargo = async (newCargo) => {
        try {
            const response = await fetch('https://cargoswift.talantacomputerschool.com/api/cargos/add', {
                method: 'POST',
                body: JSON.stringify(newCargo),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                fetchAvailableCargos();
            } else {
                console.error('Failed to add cargo');
            }
        } catch (error) {
            console.error('Failed to add cargo:', error);
        }
    };

    return (
        <div className='cargo'>
            <AvailableCargos cargos={cargos} />
            <UserCargos userId={userId} />
            <TruckerCargos userId={userId} />
            <AddCargo senderID={userId} onAddCargo={handleAddCargo} />
        </div>
    );
};

export default CargoPage;
