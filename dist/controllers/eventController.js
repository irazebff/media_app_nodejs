"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEvent = exports.getEvents = void 0;
const eventService = __importStar(require("../services/eventService"));
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Fetching events from the database');
        const events = yield eventService.getEvents();
        console.log('Events fetched successfully:', events);
        res.json(events);
    }
    catch (error) {
        console.error('Erro ao buscar eventos:', (error instanceof Error) ? error.message : 'Unknown error');
        res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
});
exports.getEvents = getEvents;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        console.log(`Fetching event with ID ${eventId} from database`);
        const event = yield eventService.getEvent(eventId);
        if (!event) {
            console.log(`Event with ID ${eventId} not found`);
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        console.log('Event fetched successfully:', event);
        res.json(event);
    }
    catch (error) {
        console.error('Erro ao buscar evento:', (error instanceof Error) ? error.message : 'Unknown error');
        res.status(500).json({ message: 'Erro ao buscar evento' });
    }
});
exports.getEvent = getEvent;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newEvent = yield eventService.createEvent(userId, {
            name,
            location,
            eventDateTime: parsedEventDateTime,
            fullPrice: parsedFullPrice,
            halfPrice: parsedHalfPrice,
            ticketId,
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error('Erro ao criar evento:', (error instanceof Error) ? error.message : 'Unknown error');
        res.status(500).json({ message: error.message });
    }
});
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updatedEvent = yield eventService.updateEvent(eventId, {
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
    }
    catch (error) {
        console.error('Erro ao atualizar evento:', (error instanceof Error) ? error.message : 'Unknown error');
        res.status(500).json({ message: 'Erro ao atualizar evento' });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        console.log(`Deleting event with ID ${eventId}`);
        yield eventService.deleteEvent(eventId);
        console.log('Event deleted successfully');
        res.status(204).send();
    }
    catch (error) {
        console.error('Erro ao deletar evento:', (error instanceof Error) ? error.message : 'Unknown error');
        res.status(500).json({ message: 'Erro ao deletar evento' });
    }
});
exports.deleteEvent = deleteEvent;
