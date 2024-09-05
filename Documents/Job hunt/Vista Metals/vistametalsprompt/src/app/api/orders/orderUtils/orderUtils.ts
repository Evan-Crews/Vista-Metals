import { prisma } from './prisma'; // Adjust the import path based on your setup

const prisma = new PrismaClient();


export async function getNextOrderNumber() {
  const lastOrder = await prisma.order.findFirst({
    orderBy: { orderNumber: 'desc' },
  });
  return lastOrder ? lastOrder.orderNumber + 1 : 1;
}