import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateItemInput {
  title: string;
  artist: string;
  album: string;
  coverURL: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
}

export const getItems = async () => {
  const items = await prisma.item.findMany();
  return items;
};

export const getItem = async (id: string) => {
  const item = await prisma.item.findUnique({
    where: { id },
  });
  return item;
};

export const createItem = async (input: CreateItemInput) => {
  const newItem = await prisma.item.create({
    data: input,
  });
  return newItem;
};

export const updateItem = async (id: string, input: Partial<CreateItemInput>) => {
  const updatedItem = await prisma.item.update({
    where: { id },
    data: input,
  });
  return updatedItem;
};

export const deleteItem = async (id: string) => {
  await prisma.item.delete({
    where: { id },
  });
};
