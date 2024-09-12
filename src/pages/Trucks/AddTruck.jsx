import React, { useContext, useEffect, useState } from 'react';
import useGeoLocation from '../../hooks/useGeoLocation';
import './AddTruck.css';
import { UserContext } from '../../App';
import { DATAURLS } from '../../utils';

const AddTruck = ({ loginInfo }) => {
    const {user,setUser} = useContext(UserContext);
    const [truckDetails, setTruckDetails] = useState({
        name: '',
        registration_number: '',
        type: '',
        tonnage: '',
        description: '',
        categoryID: null,
        categoryIndex: null,
        images: null,
    });

    const location = useGeoLocation();


    const [categories,setCategories] = useState({
        loading:false,
        message:"",
        data:[],
        error:false
    });

    const fetchCategories = async()=>{
        try {
            setCategories({...categories,loading:false,error:false,message:""});
            let request = await fetch(DATAURLS.URLS.categories);
            let response = await request.json();
            if(!response.error){
              setCategories({...response,loading:false}); 
            }
        } catch (error) {
            setCategories({
                ...categories,loading:false,error:false,message:"An error occurred. Try again later."
            });
        }
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "images") {
            setTruckDetails(prevDetails => ({
                ...prevDetails,
                [name]: files[0], 
            }));
        } else {
            setTruckDetails(prevDetails => ({
                ...prevDetails,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            console.error('User is not logged in');
            return;
        }

        const newTruck = {
            userID: user.id,
            ...truckDetails,
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng,
        };

        try {
            const formData = new FormData();
            Object.keys(newTruck).forEach(key => {
                formData.append(key, newTruck[key]);
            });

            const response = await fetch('https://cargoswift.talantacomputerschool.com/api/vehicles/add', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Truck added successfully:', data);
        } catch (error) {
            console.error('Error adding truck:', error);
        }
    };


    useEffect(()=>{
        fetchCategories();
    },[]);

    return (
        <form onSubmit={handleSubmit} className="add-truck-form">
            <h2>Add New Truck</h2>
            <input type="text" name="name" value={truckDetails.name} onChange={handleChange} placeholder="Truck Name" />
            <input type="text" name="registration_number" value={truckDetails.registration_number} onChange={handleChange} placeholder="Registration Number" />
            <label>Select category</label>
            {
                categories.loading?
                <p>Loading categories...</p>:
                categories.error?
                <p>{categories.error}</p>:
                categories.data.length>0?
                <select
                onChange={(e)=>setTruckDetails({...truckDetails,categoryID:e.target.value})}
                >
                    {
                        categories.data.map((category,index)=>{
                            return(
                                <option selected={index==0} key={index} value={category.id}>{category.name}</option>
                            )
                        })
                    }
                </select>:
                <p>No categories found.</p>
                
            }
            <input type="text" name="type" value={truckDetails.type} onChange={handleChange} placeholder="Type" />
            <input type="text" name="tonnage" value={truckDetails.tonnage} onChange={handleChange} placeholder="Tonnage" />
            <input type="text" name="description" value={truckDetails.description} onChange={handleChange} placeholder="Description" />
            <input type="file" name="images" onChange={handleChange} accept="image/*" />
            <button type="submit">Add Truck</button>
        </form>
    );
};

export default AddTruck;
