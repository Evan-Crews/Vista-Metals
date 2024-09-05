"use client";
import Image from "next/image";
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';


export default function HomePage() {
  const [orderCount, setOrderCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderCount() {
      try {
        const response = await fetch('/api/orders/totalCount');
        const data = await response.json();
        setOrderCount(data.count);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch order count:", error);
        setLoading(false);
      }
    }

    fetchOrderCount();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order_num_component">
      <h2>Total Number of Orders</h2>
      <p>{orderCount !== null ? orderCount : 'No orders found.'}</p>
    </div>
  );
}