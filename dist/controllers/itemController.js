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
exports.purchaseItem = exports.deleteItem = exports.updateItem = exports.createItem = exports.getItem = exports.getItems = void 0;
const itemService = __importStar(require("../services/itemService"));
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield itemService.getItems();
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getItems = getItems;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        const item = yield itemService.getItem(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getItem = getItem;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { title, artist, album, coverURL, description, isTrack, genero } = req.body;
        const image = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a['image']) === null || _b === void 0 ? void 0 : _b[0];
        const audio = (_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c['audio']) === null || _d === void 0 ? void 0 : _d[0];
        const newItem = yield itemService.createItem({
            title,
            artist,
            album,
            coverURL,
            description,
            imageUrl: image ? `/uploads/${image.filename}` : '',
            audioUrl: audio ? `/uploads/${audio.filename}` : '',
            isTrack,
            genero,
        });
        res.status(201).json(newItem);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createItem = createItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h;
    try {
        const itemId = req.params.id;
        const { title, artist, album, coverURL, description, isTrack, genero } = req.body;
        const image = (_f = (_e = req.files) === null || _e === void 0 ? void 0 : _e['image']) === null || _f === void 0 ? void 0 : _f[0];
        const audio = (_h = (_g = req.files) === null || _g === void 0 ? void 0 : _g['audio']) === null || _h === void 0 ? void 0 : _h[0];
        const updatedItem = yield itemService.updateItem(itemId, {
            title,
            artist,
            album,
            coverURL,
            description,
            imageUrl: image ? `/uploads/${image.filename}` : undefined,
            audioUrl: audio ? `/uploads/${audio.filename}` : undefined,
            isTrack,
            genero,
        });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        yield itemService.deleteItem(itemId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteItem = deleteItem;
const purchaseItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { itemId } = req.body;
        const purchase = yield itemService.purchaseItem(userId, itemId);
        res.status(201).json(purchase);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.purchaseItem = purchaseItem;
