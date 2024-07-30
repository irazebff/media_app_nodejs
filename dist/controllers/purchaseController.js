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
exports.getPurchasesByUser = exports.createPurchase = void 0;
const purchaseService = __importStar(require("../services/purchaseService"));
const createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.body;
        const userId = req.userId;
        console.log('createPurchase - userId:', userId, 'itemId:', itemId);
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const purchase = yield purchaseService.createPurchase(userId, itemId);
        res.status(201).json(purchase);
    }
    catch (error) {
        console.error('Erro ao criar compra:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createPurchase = createPurchase;
const getPurchasesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const purchases = yield purchaseService.getPurchasesByUser(userId);
        res.json(purchases);
    }
    catch (error) {
        console.error('Erro ao obter compras:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getPurchasesByUser = getPurchasesByUser;
