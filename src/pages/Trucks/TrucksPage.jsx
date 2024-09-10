import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrucksPage.css';
import TruckPage from './TruckPage';
import SearchTrucks from './SearchTrucks';

const Trucks = ({ userRole }) => {
    const [trucks, setTrucks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredTrucks, setFilteredTrucks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const groupTrucksByCategory = (trucks) => {
        return trucks.reduce((acc, truck) => {
            const categoryID = truck.categoryID;
            if (!acc[categoryID]) {
                acc[categoryID] = [];
            }
            acc[categoryID].push(truck);
            return acc;
        }, {});
    };

    useEffect(() => {
        const fetchTrucks = async () => {
            try {
                const response = await fetch('https://cargoswift.talantacomputerschool.com/api/vehicles/home/5576/56454');
                const data = await response.json();
                console.log('Fetched Trucks:', data);
                setTrucks(data.data || []);
            } catch (error) {
                console.error('Error fetching trucks:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('https://cargoswift.talantacomputerschool.com/api/categories');
                const data = await response.json();
                console.log('Fetched Categories:', data);
                setCategories(data.data || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchTrucks();
        fetchCategories();
    }, []);

    useEffect(() => {
        filterTrucks();
    }, [trucks, searchQuery]);

    const filterTrucks = () => {
        if (searchQuery) {
            const filtered = trucks.filter(truck =>
                truck.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredTrucks(filtered);
        } else {
            setFilteredTrucks(trucks);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleAddTruck = () => {
        navigate('/add-truck');
    };

    const groupedTrucks = groupTrucksByCategory(filteredTrucks);

    return (
        <div className='container'>
            <div className='header'>
                <SearchTrucks query={searchQuery} onSearch={handleSearch} />
            </div>
            <button onClick={handleAddTruck} className="add-truck-button">
                Add Truck
            </button>
            <div className="main">
                {Object.keys(groupedTrucks).map(categoryID => {
                    const categoryName = categories.find(category => category.id === parseInt(categoryID))?.name || 'Unknown Category';
                    return (
                        <div key={categoryID} className="category-section">
                            <h3>{categoryName}</h3>
                            <div className="data">
                                {groupedTrucks[categoryID].map(truck => (
                                    <TruckPage truck={truck} key={truck.id} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Trucks;
