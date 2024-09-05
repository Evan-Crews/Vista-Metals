"use client";
import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import OrderGrid from '../components/OrderGrid';

interface LineItem {
  lineNumber: number;
  itemName: string;
  quantity: number;
  unitPrice: number;
  requestedDate: string;
}

interface FormValues {
  orderNumber: string;
  customerName: string;
  contact: string;
  status: string;
  orderTotal: number;
  lineItems: LineItem[];
}

const NewOrder = () => {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      lineItems: [{ lineNumber: 1, itemName: '', quantity: 0, unitPrice: 0, requestedDate: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lineItems',
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const orderTotal = parseFloat(data.orderTotal.toString());
      const lineItems = data.lineItems.map(item => ({
        ...item,
        quantity: parseInt(item.quantity.toString(), 10), // Convert quantity to integer
        unitPrice: parseFloat(item.unitPrice.toString()), // Convert unitPrice to float
      }));

      const response = await fetch('/api/orders/newOrderRoute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          orderTotal,
          lineItems,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Order created successfully!');
      } else {
        alert('Error creating order: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating order');
    }
  };

  return (
    <div className='new_order_component'>
      <div className='new_order_block'>
        <h1>Create New Order</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='new_order_form'>
          <div className='form_divs'>
            <label>Order Number:</label>
            <input {...register('orderNumber', { required: true })} />
          </div>
          <div className='form_divs'>
            <label>Customer Name:</label>
            <input {...register('customerName', { required: true })} />
          </div>
          <div className='form_divs'>
            <label>Contact:</label>
            <input {...register('contact', { required: true })} />
          </div>
          <div className='form_divs'>
            <label>Status:</label>
            <input {...register('status', { required: true })} />
          </div>
          <div className='form_divs'>
            <label>Order Total (USD):</label>
            <Controller
              name="orderTotal"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  step="0.01" // Allows for decimal values
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  value={field.value || ''} // Ensure the field value is not undefined
                />
              )}
            />
          </div>
          <div className='form_divs'>
            <h2>Line Items</h2>
            {fields.map((item, index) => (
              <div key={item.id}>
                <h3>Line Item {index + 1}</h3>
                <div>
                  <label>Item Name:</label>
                  <Controller
                    name={`lineItems.${index}.itemName`}
                    control={control}
                    render={({ field }) => <input {...field} />}
                  />
                </div>
                <div className='form_divs'>
                  <label>Quantity:</label>
                  <Controller
                    name={`lineItems.${index}.quantity`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                        value={field.value || ''} // Ensure the field value is not undefined
                      />
                    )}
                  />
                </div>
                <div className='form_divs'>
                  <label>Unit Price:</label>
                  <Controller
                    name={`lineItems.${index}.unitPrice`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        step="0.01" // Allows for decimal values
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        value={field.value || ''} // Ensure the field value is not undefined
                      />
                    )}
                  />
                </div>
                <div className='form_divs'>
                  <label>Requested Date:</label>
                  <Controller
                    name={`lineItems.${index}.requestedDate`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="date"
                        {...field}
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          field.onChange(date.toISOString());
                        }}
                        value={field.value ? field.value.split('T')[0] : ''}
                      />
                    )}
                  />
                </div>
                <button type="button" onClick={() => remove(index)} className='form_buttons'>
                  Remove Line Item
                </button>
              </div>
            ))}
            <button type="button" onClick={() => append({ lineNumber: fields.length + 1, itemName: '', quantity: 0, unitPrice: 0, requestedDate: '' })} className='form_buttons'>
              Add Line Item
            </button>
          </div>
          <button type="submit" className='form_buttons'>Submit Order</button>
        </form>
      </div>
      <div className='order_grid'>
        <OrderGrid />
      </div>
    </div>
  );
};

export default NewOrder;