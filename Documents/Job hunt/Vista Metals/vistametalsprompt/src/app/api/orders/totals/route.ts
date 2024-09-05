
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// Fetch all orders with their line items
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        lineItems: true, // Include associated line items
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}