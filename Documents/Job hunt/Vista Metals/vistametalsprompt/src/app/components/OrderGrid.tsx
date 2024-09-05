import React, { useEffect , useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import '~ag-grid-community/styles/ag-grid.css';
// import '~ag-grid-community/styles/ag-theme-quartz.css';

// Define the LineItem interface
interface LineItem {
  lineNumber: number;
  itemName: string;
  qty: number;
  unitPrice: number;
  requestedDate: string; // ISO date format
}

// Define the Order interface
interface Order {
  orderNumber: string;
  customerName: string;
  contact: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'; // Enum-like typing
  orderTotalUSD: number;
  lineItems: LineItem[]; // An array of LineItems
}

const OrderGrid = () => {
  const [rowData, setRowData] = useState<Order[]>([]);
  const [columnDefs] = useState([
    { headerName: 'Order Number', field: 'orderNumber' },
    { headerName: 'Customer Name', field: 'customerName' },
    { headerName: 'Contact', field: 'contact' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Order Total (USD)', field: 'orderTotalUSD' },
    // Additional fields from line items if needed
  ]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders/totals'); //make sure this file path works
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
      />
    </div>
  );
};

export default OrderGrid;