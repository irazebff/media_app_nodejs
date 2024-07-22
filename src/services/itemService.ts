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
  return await prisma.item.findMany();
};

export const getItem = async (id: string) => {
  return await prisma.item.findUnique({
    where: { id },
  });
};

export const createItem = async (input: CreateItemInput) => {
  return await prisma.item.create({
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
};

export const updateItem = async (id: string, input: Partial<CreateItemInput>) => {
  return await prisma.item.update({
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
};

export const deleteItem = async (id: string) => {
  return await prisma.item.delete({
    where: { id },
  });
};
