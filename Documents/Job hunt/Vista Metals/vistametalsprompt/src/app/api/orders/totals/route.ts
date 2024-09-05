
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      select: {
        orderNumber: true,
        orderTotal: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order totals", details: error.message }, { status: 500 });
  }
}