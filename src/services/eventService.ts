import { PrismaClient, Event } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';


const prisma = new PrismaClient();

type CreateEventInput = {
  name: string;
  location: string;
  eventDateTime: Date;
  fullPrice: number;
  halfPrice: number;
  ticketId: string;
};

export const getEvents = async (): Promise<Event[]> => {
  try {
    return await prisma.event.findMany();
  } catch (error) {
    console.error('Erro ao buscar eventos no banco de dados:', error);
    throw new Error('Erro ao buscar eventos no banco de dados');
  }
};

export const getEvent = async (eventId: string): Promise<Event | null> => {
  try {
    return await prisma.event.findUnique({
      where: { id: eventId },
    });
  } catch (error) {
    console.error('Erro ao buscar evento no banco de dados:', error);
    throw new Error('Erro ao buscar evento no banco de dados');
  }
};

export const createEvent = async (userId: string, input: CreateEventInput): Promise<Event> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  let ticketId = input.ticketId || uuidv4();

  let existingEvent = await prisma.event.findUnique({
    where: { ticketId: ticketId },
  });

  while (existingEvent) {
    ticketId = uuidv4();
    existingEvent = await prisma.event.findUnique({
      where: { ticketId: ticketId },
    });
  }

  return await prisma.event.create({
    data: {
      name: input.name,
      location: input.location,
      eventDateTime: input.eventDateTime,
      fullPrice: input.fullPrice,
      halfPrice: input.halfPrice,
      ticketId: ticketId,
      userId: userId,
    },
  });
};
export const updateEvent = async (eventId: string, input: CreateEventInput): Promise<Event | null> => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error('Evento não encontrado');
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        name: input.name,
        location: input.location,
        eventDateTime: input.eventDateTime,
        fullPrice: input.fullPrice,
        halfPrice: input.halfPrice,
        ticketId: input.ticketId,
      },
    });

    return updatedEvent;
  } catch (error) {
    console.error('Erro ao atualizar evento no banco de dados:', error);
    throw new Error('Erro ao atualizar evento no banco de dados');
  }
};

export const deleteEvent = async (eventId: string): Promise<Event | null> => {
  try {
    return await prisma.event.delete({
      where: { id: eventId },
    });
  } catch (error) {
    console.error('Erro ao deletar evento no banco de dados:', error);
    throw new Error('Erro ao deletar evento no banco de dados');
  }
};
