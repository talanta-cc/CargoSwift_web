import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrucksPage.css';
import TruckPage from './TruckPage';
import SearchTrucks from './SearchTrucks';

const categoryMap = {
    'trailer': 1,
    'semi-truck': 2,
    'pickup': 3
};

const Trucks = () => {
    const [trucks, setTrucks] = useState([]);
    const [filteredTrucks, setFilteredTrucks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrucks();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            searchTrucks();
        } else if (selectedCategory) {
            filterTrucksByCategory();
        } else {
            setFilteredTrucks(trucks);
        }
    }, [searchQuery, selectedCategory, trucks]);

    const fetchTrucks = async () => {
        try {
            const response = await fetch('https://cargoswift.talantacomputerschool.com/api/vehicles/home/5576/56454');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched Trucks:', data);
            setTrucks(data.data || []);
            setFilteredTrucks(data.data || []);
        } catch (error) {
            console.error('Error fetching trucks:', error);
        }
    };

    const searchTrucks = async () => {
        try {
            const formData = new FormData();
            formData.append('search', searchQuery);
            const response = await fetch('https://cargoswift.talantacomputerschool.com/api/vehicles', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Searched Trucks:', data);
            setFilteredTrucks(data.data || []);
        } catch (error) {
            console.error('Error searching trucks:', error);
        }
    };

    const filterTrucksByCategory = () => {
        console.log('Filtering by Category:', selectedCategory);
        const categoryID = categoryMap[selectedCategory];
        if (categoryID !== undefined) {
            const filtered = trucks.filter(truck => truck.categoryID === categoryID);
            console.log('Filtered Trucks by Category:', filtered);
            setFilteredTrucks(filtered);
        } else {
            console.log('Invalid category selected');
            setFilteredTrucks([]);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleAddTruck = () => {
        navigate('/add-truck');
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? '' : category);
    };

    return (
        <div className='container'>
            <SearchTrucks query={searchQuery} onSearch={handleSearch} />
            <div className='header'>
                <div className="category-buttons">
                    <button onClick={() => handleCategoryClick('trailer')}>Trailer</button>
                    <button onClick={() => handleCategoryClick('semi-truck')}>Semi-Truck</button>
                    <button onClick={() => handleCategoryClick('pickup')}>Pickup</button>
                </div>
            </div>
            <button onClick={handleAddTruck} className="add-truck-button">
                Add Truck
            </button>
            <div className="main">
                <div className="data">
                    {filteredTrucks.length > 0 ? (
                        filteredTrucks.map(truck => (
                            <TruckPage truck={truck} key={truck.id} />
                        ))
                    ) : (
                        <p>No trucks available for the selected category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Trucks;
