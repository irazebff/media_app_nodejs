"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/purchaseRoutes.ts
const express_1 = require("express");
const purchaseController_1 = require("../controllers/purchaseController");
const checkPermission_1 = require("../middlewares/checkPermission");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post('/', (0, checkPermission_1.checkPermission)([client_1.Role.CLIENT]), purchaseController_1.createPurchase);
router.get('/', (0, checkPermission_1.checkPermission)([client_1.Role.CLIENT]), purchaseController_1.getPurchasesByUser);
exports.default = router;
