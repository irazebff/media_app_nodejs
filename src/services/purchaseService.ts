import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPurchase = async (userId: string, itemId: string) => {
  const itemExists = await prisma.item.findUnique({
    where: { id: itemId },
  });

  if (!itemExists) {
    throw new Error('Item not found');
  }

  return await prisma.purchase.create({
    data: {
      userId,
      itemId,
    },
  });
};

export const getPurchasesByUser = async (userId: string) => {
  return await prisma.purchase.findMany({
    where: { userId },
    include: {
      item: true, 
    },
  });
};
