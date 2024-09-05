"use client"
import React, { useEffect , useState } from 'react';
import OrderGrid from '../components/OrderGrid';

const NewOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [lineItems, setLineItems] = useState([{ lineNumber: 1, itemName: '', quantity: 0, unitPrice: 0, requestedDate: '' }]);

  const handleLineItemChange = (index: number, field: string, value: any) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems[index] = { ...updatedLineItems[index], [field]: value };
    setLineItems(updatedLineItems);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/orders/newOrderRoute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber,
          customerName,
          contact,
          status,
          orderTotal,
          lineItems,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Order created successfully!');
        // Optionally, you can reset the form here
      } else {
        alert('Error creating order: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating order');
    }
  };

  return (
    <div>
      <h1>Create New Order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order Number:</label>
          <input type="text" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} required />
        </div>
        <div>
          <label>Customer Name:</label>
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
        </div>
        <div>
          <label>Contact:</label>
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </div>
        <div>
          <label>Order Total (USD):</label>
          <input type="number" value={orderTotal} onChange={(e) => setOrderTotal(Number(e.target.value))} required />
        </div>
        <div>
          <h2>Line Items</h2>
          {lineItems.map((item, index) => (
            <div key={index}>
              <h3>Line Item {index + 1}</h3>
              <div>
                <label>Item Name:</label>
                <input
                  type="text"
                  value={item.itemName}
                  onChange={(e) => handleLineItemChange(index, 'itemName', e.target.value)}
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleLineItemChange(index, 'quantity', Number(e.target.value))}
                />
              </div>
              <div>
                <label>Unit Price:</label>
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => handleLineItemChange(index, 'unitPrice', Number(e.target.value))}
                />
              </div>
              <div>
              <label>Requested Date:</label>
                <input
                  type="date"
                  value={item.requestedDate.split('T')[0]} // Extract the date part from ISO string
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    handleLineItemChange(index, 'requestedDate', date.toISOString());
                  }}
                />
              </div>
            </div>
          ))}
          {/* You can add functionality to dynamically add/remove line items */}
        </div>
        <button type="submit">Submit Order</button>
      </form>
      <OrderGrid />
    </div>
  );
};

export default NewOrder;