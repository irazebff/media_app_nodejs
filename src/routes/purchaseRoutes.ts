// src/routes/purchaseRoutes.ts
import { Router } from 'express';
import { createPurchase, getPurchasesByUser } from '../controllers/purchaseController';
import { checkPermission } from '../middlewares/checkPermission';
import { Role } from '@prisma/client';

const router = Router();

router.post('/', checkPermission([Role.CLIENT]), createPurchase);
router.get('/', checkPermission([Role.CLIENT]), getPurchasesByUser);

export default router;
