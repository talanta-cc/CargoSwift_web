import React from 'react';
import './Home.css';

function Home() {
  return (
    <>
      <div className='homepage'>
        <div className="home_contents">
          <h2>Safest Logistics 
          <br /> Solutions Provider 
          <br /> With Integrity
          </h2>
          <p>Our cargo logistics company excels <br />
           in seamless global transportation, <br />
          ensuring efficient, secure,<br />
           and timely delivery of goods. <br />
            Leveraging advanced technology <br />
            and a dedicated team,<br />
           we optimize supply chains <br />
           to meet diverse industry needs.</p>
           <button className='home_btn'>Explore More</button>
        </div>
      </div>
      <div className="homepage_contents">
          <div className="col_1">
            <div className="what_wedo">
            <h5>What We Do</h5>
            </div>
            <h3>Safe & Reliable <br />Cargo Solutions</h3>
          </div>
          <div className="col_2">
          <div className="sea_services">
            <div className="sea_img"><i className="fa-solid fa-ship"></i>
            </div>
           <div className="sea_contents">
           <h4>Sea Transport Services</h4>
              <p>Our sea transport services <br /> offer unparalleled br efficiency <br />
               and reliability for global shipping. <br />
                We specialize in the seamless <br />
                 movement of goods across oceans,  <br />
                 ensuring that your cargo reaches <br />
                 its destination safely and on time. <br />
                 Utilizing state-of-the-art vessels <br /> and tracking 
                technology, we provide  <br />real-time updates and full transparency <br />
                 throughout  the shipping process.</p>
           </div>
          </div>
          <div className="air_services">
          <div className="sea_img"><i className="fa-solid fa-plane"></i></div>
            <div className="air_contents">
            <h4>Air Transport Services</h4>
              <p>Our air cargo services provide fast, <br />
              reliable, and efficient delivery <br />
              solutions globally, ensuring <br />
              timely arrival of your goods. <br />
              Utilizing cutting-edge technology <br />
              and experienced personnel, <br />
              we optimize your air freight needs.</p>
            </div>
          </div>
          </div>
          <div className="col_3">
          <div className="warehouse_services">
          <div className="sea_img"><i className="fa-solid fa-warehouse"></i></div>
          <div className="warehouse_contents">
          <h4>Warehouse Services</h4>
              <p>Our comprehensive warehouse services <br />
              ensure safe and secure storage <br />
              of your goods. We provide <br />
              advanced inventory management, <br />
              and seamless distribution, <br />
              tailored to your needs.</p>
          </div>
          </div>
          <div className="local_services">
          <div className="sea_img"><i className="fa-solid fa-truck"></i></div>
            <div className="local_contents">
            <h4>Local Shipping Services</h4>
              <p>We offer reliable and efficient <br />
              local shipping services to ensure <br />
              timely delivery of goods within <br />
              your city or region. Our local <br />
              shipping solutions are designed <br />
              to meet your specific needs <br />
              with precision and care.</p>
            </div>
          </div>
          </div>
        </div> 
        <section className='section-2'>
            <div className="image-section">

            </div>
            <div className="card">
                <div className="why-us">
                    <div>
                    <p className="tag">Why Us</p>
                    <h1 className='heading'>We Provide Full Range Global Logistics Solution</h1>
                    </div>
                    <div className='mini-image'>
                      {/* <img src={plane} class='plane-img' alt="" /> */}
                    </div>

                </div>
            </div>
        </section>
    </>
  )
}

export default Home;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './TrucksPage.css';
// import TruckPage from './TruckPage';
// import SearchTrucks from './SearchTrucks';
// import { DATAURLS } from '../../utils';

// const Trucks = () => {
//     const [trucks, setTrucks] = useState([]);
//     const [filteredTrucks, setFilteredTrucks] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchTrucks();
//     }, []);

//     useEffect(() => {
//         if (searchQuery) {
//             searchTrucksAPI();  // Call API for searching trucks
//         } else if (selectedCategory) {
//             filterTrucksByCategoryAPI();  // Call API for filtering trucks by category
//         } else {
//             setFilteredTrucks(trucks);  // Show all trucks if no query or category is selected
//         }
//     }, [searchQuery, selectedCategory, trucks]);

//     const fetchTrucks = async () => {
//         try {
//             const response = await fetch(DATAURLS.URLS.vehicles);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             console.log('Fetched Trucks:', data);
//             setTrucks(data.data || []);
//             setFilteredTrucks(data.data || []);
//         } catch (error) {
//             console.error('Error fetching trucks:', error);
//         }
//     };

//     const searchTrucksAPI = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('search', searchQuery); // Add the search query to the request
//             const response = await fetch(DATAURLS.URLS.searchVehicles, {
//                 method: 'POST',
//                 body: formData,
//             });
//             const data = await response.json();
//             console.log('Searched Trucks:', data);
//             setFilteredTrucks(data.data || []);
//         } catch (error) {
//             console.error('Error searching trucks:', error);
//         }
//     };

//     const filterTrucksByCategoryAPI = async () => {
//         try {
//             const response = await fetch(`${DATAURLS.URLS.filterByCategory}/${selectedCategory}`);
//             const data = await response.json();
//             console.log('Filtered Trucks by Category:', data);
//             setFilteredTrucks(data.data || []);
//         } catch (error) {
//             console.error('Error filtering trucks by category:', error);
//         }
//     };

//     const handleSearch = (query) => {
//         setSearchQuery(query); // Set the search query
//     };

//     const handleAddTruck = () => {
//         navigate('/add-truck'); // Navigate to Add Truck page
//     };

//     const handleCategoryClick = (category) => {
//         setSelectedCategory(category === selectedCategory ? '' : category); // Toggle category selection
//     };

//     return (
//         <div className='container'>
//             <SearchTrucks query={searchQuery} onSearch={handleSearch} />
//             <div className='header'>
//                 <div className="category-buttons">
//                     <button onClick={() => handleCategoryClick('trailer')}>Trailer</button>
//                     <button onClick={() => handleCategoryClick('semi-truck')}>Semi-Truck</button>
//                     <button onClick={() => handleCategoryClick('pickup')}>Pickup</button>
//                 </div>
//             </div>
//             <button onClick={handleAddTruck} className="add-truck-button">
//                 Add Truck
//             </button>
//             <div className="main">
//                 <div className="data">
//                     {filteredTrucks.length > 0 ? (
//                         filteredTrucks.map(truck => (
//                             <TruckPage truck={truck} key={truck.id} />
//                         ))
//                     ) : (
//                         <p>No trucks available for the selected category or search term.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Trucks;
