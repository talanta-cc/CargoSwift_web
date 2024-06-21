import React, { useState } from 'react';
import './OrderList.css';

const OrderList = ({ user }) => {
  const [orders, setOrders] = useState([
    { id: 1, status: 'Delivered', description: 'Order 1 details' },
    { id: 2, status: 'In Progress', description: 'Order 2 details' },
    { id: 3, status: 'Cancelled', description: 'Order 3 details' },
    { id: 4, status: 'Delivered', description: 'Order 4 details' },
  ]);

  const [filter, setFilter] = useState('All');

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.status === filter);

  return (
    <div className="order-list">
      <h1>{user.name ? `${user.name}'s Orders` : 'Your Orders'}</h1>
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
