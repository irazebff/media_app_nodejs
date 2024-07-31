import { Request, Response } from 'express';
import * as eventService from '../services/eventService';

export const getEvents = async (req: Request, res: Response) => {
  try {
    console.log('Fetching events from the database');
    const events = await eventService.getEvents();
    console.log('Events fetched successfully:', events);
    res.json(events);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao buscar eventos:', error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Erro ao buscar eventos: erro desconhecido');
      res.status(500).json({ message: 'Unknown error' });
    }
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    console.log(`Fetching event with ID ${eventId} from database`);
    const event = await eventService.getEvent(eventId);
    if (!event) {
      console.log(`Event with ID ${eventId} not found`);
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    console.log('Event fetched successfully:', event);
    res.json(event);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao buscar evento:', error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Erro ao buscar evento: erro desconhecido');
      res.status(500).json({ message: 'Unknown error' });
    }
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { userId, name, location, eventDateTime, fullPrice, halfPrice, ticketId } = req.body;

    console.log('Received data:', { userId, name, location, eventDateTime, fullPrice, halfPrice, ticketId });

    if (!userId || !name || !location || !eventDateTime || fullPrice == null || halfPrice == null || !ticketId) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const parsedEventDateTime = new Date(eventDateTime);
    if (isNaN(parsedEventDateTime.getTime())) {
      return res.status(400).json({ message: 'Data de evento inválida' });
    }

    const parsedFullPrice = parseFloat(fullPrice);
    const parsedHalfPrice = parseFloat(halfPrice);
    if (isNaN(parsedFullPrice) || isNaN(parsedHalfPrice)) {
      return res.status(400).json({ message: 'Preços inválidos' });
    }

    const newEvent = await eventService.createEvent(userId, {
      name,
      location,
      eventDateTime: parsedEventDateTime,
      fullPrice: parsedFullPrice,
      halfPrice: parsedHalfPrice,
      ticketId,
    });

    res.status(201).json(newEvent);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao criar evento:', error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Erro ao criar evento: erro desconhecido');
      res.status(500).json({ message: 'Unknown error' });
    }
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const { name, location, eventDateTime, fullPrice, halfPrice, ticketId } = req.body;

    console.log('Received data:', { name, location, eventDateTime, fullPrice, halfPrice, ticketId });

    if (!name || !location || !eventDateTime || fullPrice == null || halfPrice == null || !ticketId) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const parsedEventDateTime = new Date(eventDateTime);
    if (isNaN(parsedEventDateTime.getTime())) {
      return res.status(400).json({ message: 'Data de evento inválida' });
    }

    const parsedFullPrice = parseFloat(fullPrice);
    const parsedHalfPrice = parseFloat(halfPrice);
    if (isNaN(parsedFullPrice) || isNaN(parsedHalfPrice)) {
      return res.status(400).json({ message: 'Preços inválidos' });
    }

    console.log(`Updating event with ID ${eventId}`);
    const updatedEvent = await eventService.updateEvent(eventId, {
      name,
      location,
      eventDateTime: parsedEventDateTime,
      fullPrice: parsedFullPrice,
      halfPrice: parsedHalfPrice,
      ticketId,
    });

    if (!updatedEvent) {
      console.log(`Event with ID ${eventId} not found`);
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    console.log('Event updated successfully:', updatedEvent);
    res.json(updatedEvent);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao atualizar evento:', error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Erro ao atualizar evento: erro desconhecido');
      res.status(500).json({ message: 'Unknown error' });
    }
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    console.log(`Deleting event with ID ${eventId}`);
    await eventService.deleteEvent(eventId);
    console.log('Event deleted successfully');
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao deletar evento:', error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Erro ao deletar evento: erro desconhecido');
      res.status(500).json({ message: 'Unknown error' });
    }
  }
};
