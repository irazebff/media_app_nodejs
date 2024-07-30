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
exports.purchaseItem = exports.deleteItem = exports.updateItem = exports.createItem = exports.getItem = exports.getItems = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.item.findMany();
});
exports.getItems = getItems;
const getItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.item.findUnique({
        where: { id },
    });
});
exports.getItem = getItem;
const createItem = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.item.create({
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
});
exports.createItem = createItem;
const updateItem = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.item.update({
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
});
exports.updateItem = updateItem;
const deleteItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.item.delete({
        where: { id },
    });
});
exports.deleteItem = deleteItem;
function purchaseItem(userId, itemId) {
    throw new Error('Function not implemented.');
}
exports.purchaseItem = purchaseItem;
