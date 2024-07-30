"use strict";
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
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const getEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.event.findMany();
    }
    catch (error) {
        console.error('Erro ao buscar eventos no banco de dados:', error);
        throw new Error('Erro ao buscar eventos no banco de dados');
    }
});
exports.getEvents = getEvents;
const getEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.event.findUnique({
            where: { id: eventId },
        });
    }
    catch (error) {
        console.error('Erro ao buscar evento no banco de dados:', error);
        throw new Error('Erro ao buscar evento no banco de dados');
    }
});
exports.getEvent = getEvent;
const createEvent = (userId, input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    let ticketId = input.ticketId || (0, uuid_1.v4)();
    let existingEvent = yield prisma.event.findUnique({
        where: { ticketId: ticketId },
    });
    while (existingEvent) {
        ticketId = (0, uuid_1.v4)();
        existingEvent = yield prisma.event.findUnique({
            where: { ticketId: ticketId },
        });
    }
    return yield prisma.event.create({
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
});
exports.createEvent = createEvent;
const updateEvent = (eventId, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield prisma.event.findUnique({
            where: { id: eventId },
        });
        if (!event) {
            throw new Error('Evento não encontrado');
        }
        const updatedEvent = yield prisma.event.update({
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
    }
    catch (error) {
        console.error('Erro ao atualizar evento no banco de dados:', error);
        throw new Error('Erro ao atualizar evento no banco de dados');
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.event.delete({
            where: { id: eventId },
        });
    }
    catch (error) {
        console.error('Erro ao deletar evento no banco de dados:', error);
        throw new Error('Erro ao deletar evento no banco de dados');
    }
});
exports.deleteEvent = deleteEvent;
