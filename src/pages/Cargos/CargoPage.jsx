import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cargopage.css'; 
import { UserContext } from '../../App';
import { DATAURLS } from '../../utils';
import useGeoLocation from '../../hooks/useGeoLocation';

const CargoPage = ({ userId }) => {
    const {user,setUser} = useContext(UserContext);

    const [cargos, setCargos] = useState([]);
    const navigate = useNavigate();

    const location = useGeoLocation();

    const fetchAvailableCargos = useCallback(async () => {
        try {
            

            const request = await fetch(`${DATAURLS.URLS.cargos}/${location.coordinates.latitude}/${location.coordinates.longitude}`);
            const response = await request.json();
            setCargos(response.data);
        } catch (error) {
            console.error('Error fetching cargos:', error);
        }
    }, [userId]);

    useEffect(() => {
        console.log(location);
        
        if(location.coordinates.latitude){
            fetchAvailableCargos();
        }
        
    }, [fetchAvailableCargos,location]);

    const handleAddCargo = () => {
        navigate('/add-cargo');
    };

    return (
        <div className="cargo-page">
            <h2>Available Cargos</h2>
            {/* <button onClick={handleAddCargo} className="add-cargo-button">Add Cargo</button> */}
            {cargos.length ? (
                cargos.map(cargo => (
                    <div key={cargo.id} className="cargo-item">
                        <img style={{
                            width:200,
                            height:150,
                            objectFit:"contain",

                        }} src={`${DATAURLS.BASEURL}/${cargo.image}`} />
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
