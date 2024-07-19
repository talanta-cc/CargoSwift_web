import React, { useState, useEffect } from 'react';
import './TrucksPage.css';
import Truck from './TruckPage';
// import useGetLocation from './useGetLocation';

const Trucks = () => {
    const [trucks, setTrucks] = useState({
        error: false,
        message: "",
        loading: false,
        data: []
    });
    const [categories, setCategories] = useState([]);
    const [pickup, setPickup] = useState('Pickup Point');
    const [droppingPoint, setDroppingPoint] = useState('Dropping Point');
    const [date, setDate] = useState('');
    const [typeAC, setTypeAC] = useState(false);
    const [typeClassic, setTypeClassic] = useState(false);
    const [typeCoach, setTypeCoach] = useState(false);
    const [filteredTrucks, setFilteredTrucks] = useState( {
        error: false,
        message: "",
        loading: false,
        data: []
    });
    const [selectedTruck, setSelectedTruck] = useState(null);
    // const { location, getLocation } = useGetLocation(); 

    const fetchTrucks = async () => {
        try {
            const response = await fetch('https://cargoswift.talantacomputerschool.com/api/vehicles/home/5576/56454');
            const data = await response.json();
            console.log('Fetched Trucks:', data);
            setTrucks(data);
            setFilteredTrucks(data);
        } catch (error) {
            console.error('Error fetching trucks:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://cargoswift.talantacomputerschool.com/api/categories');
            const data = await response.json();
            console.log('Fetched Categories:', data);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleFilterChange = (type, checked) => {
        switch (type) {
            case 'AC':
                setTypeAC(checked);
                break;
            case 'Classic':
                setTypeClassic(checked);
                break;
            case 'Coach':
                setTypeCoach(checked);
                break;
            default:
                break;
        }
    };

    const filterTrucks = () => {
        let updatedTrucks = trucks.data.filter(truck => {
            const matchPickup = pickup === 'Pickup Point' || truck.tripDetails.startLocation.includes(pickup);
            const matchDrop = droppingPoint === 'Dropping Point' || truck.tripDetails.destinationLocation.includes(droppingPoint);
            const matchDate = date === '' || truck.tripDetails.startTime.includes(date);
            return matchPickup && matchDrop && matchDate;
        });

        updatedTrucks = updatedTrucks.filter(truck => {
            return (
                (typeAC && truck.type === 'AC') ||
                (typeClassic && truck.type === 'Classic') ||
                (typeCoach && truck.type === 'Coach') ||
                (!typeAC && !typeClassic && !typeCoach)
            );
        });

        setFilteredTrucks(updatedTrucks);
    };

    useEffect(() => {
        fetchTrucks();
         fetchCategories();
    }, []);

    useEffect(() => {
        filterTrucks();
    }, [pickup, droppingPoint, date, typeAC, typeClassic, typeCoach]);

    const submitForm = (e) => {
        e.preventDefault();
        filterTrucks();
    };

    const handleSelectTruck = (truck) => {
        setSelectedTruck(truck);
    };

    return (
        <div className='container'>
            <div className='header'>
                <form onSubmit={submitForm}>
                    <select name="pickup-point" onChange={e => setPickup(e.target.value)} value={pickup}>
                        <option value="Pickup Point">--Pickup Point--</option>
                        {Array.isArray(categories) && categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>

                    <select name="Dropping-point" value={droppingPoint} onChange={e => setDroppingPoint(e.target.value)}>
                        <option value="Dropping Point">--Dropping Point--</option>
                        {Array.isArray(categories) && categories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                    <button type='submit'>Find</button>
                </form>
            </div>
            <div className="main">
                <div className="filter">
                    <div className="title">
                        <h1>Filter</h1>
                        <small onClick={() => { setTypeAC(false); setTypeClassic(false); setTypeCoach(false); }}>Reset All</small>
                    </div>
                    <hr />
                    <h4>Vehicle Type</h4>
                    <div className="choices">
                        <input type="checkbox" checked={typeClassic} onChange={e => handleFilterChange('Classic', e.target.checked)} />
                        <label>Classic</label>
                    </div>
                    <div className="choices">
                        <input type="checkbox" checked={typeCoach} onChange={e => handleFilterChange('Coach', e.target.checked)} />
                        <label>Coach</label>
                    </div>
                    <div className="choices">
                        <input type="checkbox" checked={typeAC} onChange={e => handleFilterChange('AC', e.target.checked)} />
                        <label>AC</label>
                    </div>
                </div>
                <div className="data">
                    {trucks?.data.length > 0 ? (
                        trucks.data.map(truck => (
                            <Truck truck={truck} key={truck.id} onSelect={handleSelectTruck} />
                        ))
                    ) : (
                        <p>No trucks available</p>
                    )}
                </div>
            </div>           
        </div>
    );
};

export default Trucks;
