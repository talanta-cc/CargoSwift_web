import React from 'react';
import AvailableCargos from './AvailableCargos';
import UserCargos from './UserCargos';
import TruckerCargos from './TruckerCargos';
import AddCargo from './AddCargo.jsx';
import './Cargopage.css';

const CargoPage = ({ userId, latitude, longitude }) => {
    return (
        <div className='cargo'>
            <AvailableCargos latitude={latitude} longitude={longitude} />
            <UserCargos userId={userId} />
            <TruckerCargos userId={userId} />
            <AddCargo senderID={userId} />  
        </div>
    );
};

export default CargoPage;