import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrucksPage.css';
import TruckPage from './TruckPage';
import SearchTrucks from './SearchTrucks';
import { UserContext } from '../../App';
import { DATAURLS } from '../../utils';

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
    const [latitude, setLatitude] = useState(0);  
    const [longitude, setLongitude] = useState(0);
    const navigate = useNavigate();

    const { user } = useContext(UserContext); 

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
            const response = await fetch(`https://cargoswift.talantacomputerschool.com/api/vehicles/home/${latitude}/${longitude}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
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
            const response = await fetch(DATAURLS.URLS.searchVehicles, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            const data = await response.json();
            setFilteredTrucks(data.data || []);
        } catch (error) {
            console.error('Error searching trucks:', error);
        }
    };
    const filterTrucksByCategory = async () => {
        const categoryID = categoryMap[selectedCategory];
        if (categoryID !== undefined) {
            try {
                const response = await fetch(
                    `https://cargoswift.talantacomputerschool.com/api/vehicles/category/${latitude}/${longitude}/${categoryID}`
                );
                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }
                const data = await response.json();
                setFilteredTrucks(data.data || []);
            } catch (error) {
                console.error('Error filtering trucks by category:', error);
            }
        } else {
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
            
            {user?.role === 'trucker' && ( 
                <button onClick={handleAddTruck} className="add-truck-button" id='truck_btn'>
                    Add Truck
                </button>
            )}
            
            <div className="main">
                <div className="data">
                    {filteredTrucks.length > 0 ? (
                        filteredTrucks.map(truck => (
                            <TruckPage truck={truck} key={truck.id} />
                        ))
                    ) : (
                        <p>No trucks available for the selected category or search term.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Trucks;
