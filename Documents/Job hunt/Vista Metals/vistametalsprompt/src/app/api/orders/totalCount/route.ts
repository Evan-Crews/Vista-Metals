import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const count = await prisma.order.count();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order count", details: error.message }, { status: 500 });
  }
}