import prisma from '../prismaClient';

export const createPurchase = async (userId: string, itemId: string) => {
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
