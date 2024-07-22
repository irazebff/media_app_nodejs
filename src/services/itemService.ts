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
  isTrack: boolean;
  genero: string;
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
    data: {
      title: input.title,
      artist: input.artist,
      album: input.album,
      coverURL: input.coverURL,
      description: input.description,
      imageUrl: input.imageUrl,
      audioUrl: input.audioUrl,
      isTrack: input.isTrack,
      genero: input.genero,
    },
  });
  return newItem;
};

export const updateItem = async (id: string, input: Partial<CreateItemInput>) => {
  const updatedItem = await prisma.item.update({
    where: { id },
    data: {
      title: input.title,
      artist: input.artist,
      album: input.album,
      coverURL: input.coverURL,
      description: input.description,
      imageUrl: input.imageUrl,
      audioUrl: input.audioUrl,
      isTrack: input.isTrack,
      genero: input.genero,
    },
  });
  return updatedItem;
};

export const deleteItem = async (id: string) => {
  await prisma.item.delete({
    where: { id },
  });
};
