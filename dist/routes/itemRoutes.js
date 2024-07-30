"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("../middlewares/multer"));
const itemController_1 = require("../controllers/itemController");
const checkPermission_1 = require("../middlewares/checkPermission");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/items', (0, checkPermission_1.checkPermission)('CLIENT'), itemController_1.getItems);
router.get('/items/:id', (0, checkPermission_1.checkPermission)('CLIENT'), itemController_1.getItem);
router.post('/items', (0, checkPermission_1.checkPermission)('ADMIN'), multer_1.default.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), itemController_1.createItem);
router.put('/items/:id', (0, checkPermission_1.checkPermission)('ADMIN'), multer_1.default.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), itemController_1.updateItem);
router.delete('/items/:id', (0, checkPermission_1.checkPermission)('ADMIN'), itemController_1.deleteItem);
