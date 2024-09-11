import React, { useContext, useEffect, useState } from 'react';
import './Cargopage.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const UserCargos = ({ userId }) => {
    const [cargos, setCargos] = useState([]);
    const [error, setError] = useState(null);
    const {user,setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCargos = async () => {
            try {
                const request = await fetch(`https://cargoswift.talantacomputerschool.com/api/cargos/cargos-own/${user.id}`);
                if (!request.ok) {
                    throw new Error('Failed to fetch cargos');
                }
                const response = await request.json();
                setCargos(response.data);

            } catch (error) {
                setError(error.message);
                console.error("Error fetching user cargos:", error);
            }
        };
        if(user){
            fetchCargos();
        }
    }, [userId]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleAddCargo = () => {
        navigate('/add-cargo');
    };

    return (
        <div className="user-cargos">
            <h2>My Cargos</h2>
            <button onClick={handleAddCargo} className="add-cargo-button">Add Cargo</button>
            {cargos.length ? (
                cargos.map(cargo => (
                    <div key={cargo.id} className="cargo-item">
                        <h3>{cargo.description}</h3>
                        <p>Estimated Size: {cargo.estimated_size} {cargo.measurement_unit}</p>
                        <p>Location: {cargo.sender_location}</p>
                        <p>Receiver: {cargo.receiver_name}, {cargo.receiver_phone}</p>
                        <Link to={`/user-cargos/${cargo.id}`} >
                        View more
                        </Link>
                    </div>
                ))
            ) : (
                <p>No cargos found</p>
            )}
        </div>
    );
};

export default UserCargos;
