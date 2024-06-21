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
<div className="last_part">
  
</div>
    </>
  )
}

export default Home;
