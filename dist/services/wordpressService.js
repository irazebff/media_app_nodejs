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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = exports.getPosts = void 0;
const axios_1 = __importDefault(require("axios"));
const wordpressBaseUrl = 'https://fatsus.com.br/wp-json/wp/v2';
function getPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${wordpressBaseUrl}/posts`);
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao buscar posts:', error.message);
            }
            else {
                console.error('Erro ao buscar posts:', error);
            }
            throw new Error('Erro ao buscar posts');
        }
    });
}
exports.getPosts = getPosts;
// Adicionando uma função para buscar eventos, assumindo que eventos são representados por posts com uma categoria específica.
function getEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Ajuste o filtro de categoria conforme necessário
            const response = yield axios_1.default.get(`${wordpressBaseUrl}/posts?categories=EVENT_CATEGORY_ID`);
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao buscar eventos:', error.message);
            }
            else {
                console.error('Erro ao buscar eventos:', error);
            }
            throw new Error('Erro ao buscar eventos');
        }
    });
}
exports.getEvents = getEvents;
