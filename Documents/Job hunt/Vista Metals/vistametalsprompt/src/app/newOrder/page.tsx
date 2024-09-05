"use client"
import React, { useEffect , useState } from 'react';
import OrderGrid from '../components/OrderGrid';


const NewOrder = () => {
  return (
    <div>
      <h1>New Order</h1>
      <p>Here you can create a new order.</p>
      {/* Include form or additional components to handle new orders */}
      <OrderGrid />
    </div>
  );
};

export default NewOrder;