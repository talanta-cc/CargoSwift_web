import React, { useState, useEffect } from 'react';
import './OrderList.css';

const OrderList = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://cargoswift.talantacomputerschool.com/api/orders/${user?.id}`);
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.status === filter);

  return (
    <div className="order-list">
      <h1>{user?.name ? `${user.name}'s Orders` : 'Your Orders'}</h1>
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('All')}>All</button>
        <button onClick={() => handleFilterChange('Delivered')}>Delivered</button>
        <button onClick={() => handleFilterChange('In Progress')}>In Progress</button>
        <button onClick={() => handleFilterChange('Cancelled')}>Cancelled</button>
      </div>
      <div className="orders">
        {filteredOrders.map(order => (
          <div key={order.id} className="order">
            <h2>Order #{order.id}</h2>
            <p>Status: {order.status}</p>
            <p>{order.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
