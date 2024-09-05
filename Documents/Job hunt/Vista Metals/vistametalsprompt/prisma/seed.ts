const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.lineItem.deleteMany({});
  await prisma.order.deleteMany({});

  // Insert sample orders
  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'ORD001',
      customerName: 'Alice Johnson',
      contact: 'alice@example.com',
      status: 'Completed',
      orderTotal: 150.75,
      lineItems: {
        create: [
          {
            lineNumber: 1,
            itemName: 'Widget A',
            quantity: 2,
            unitPrice: 25.00,
            requestedDate: new Date('2024-08-01'),
          },
          {
            lineNumber: 2,
            itemName: 'Widget B',
            quantity: 1,
            unitPrice: 100.75,
            requestedDate: new Date('2024-08-01'),
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      orderNumber: 'ORD002',
      customerName: 'Bob Smith',
      contact: 'bob@example.com',
      status: 'Pending',
      orderTotal: 75.20,
      lineItems: {
        create: [
          {
            lineNumber: 1,
            itemName: 'Widget C',
            quantity: 3,
            unitPrice: 25.00,
            requestedDate: new Date('2024-08-02'),
          },
        ],
      },
    },
  });

  console.log({ order1, order2 });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });