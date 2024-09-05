import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log('this is the top of the route.ts in newOrderRoute')

export async function POST(request: Request) {
  try {
    const { orderNumber, customerName, contact, status, orderTotal, lineItems } = await request.json();

    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        contact,
        status,
        orderTotal,
        lineItems: {
          create: lineItems,
        },
      },
    });

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}