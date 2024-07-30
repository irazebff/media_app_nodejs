import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPurchase = async (userId: string, itemId: string) => {
  try {
    return await prisma.purchase.create({
      data: {
        userId,
        itemId,
      },
    });
  } catch (error) {
    console.error("Error in purchaseService.createPurchase:", error.message);
    throw error;
  }
};

export const getPurchasesByUser = async (userId: string) => {
  try {
    return await prisma.purchase.findMany({
      where: { userId },
      include: {
        item: true,
      },
    });
  } catch (error) {
    console.error("Error in purchaseService.getPurchasesByUser:", error.message);
    throw error;
  }
};
