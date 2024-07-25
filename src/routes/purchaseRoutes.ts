import { Router } from 'express';
import { createPurchase, getPurchasesByUser } from '../controllers/purchaseController';
import { checkRole } from '../middlewares/checkRole';
import { Role } from '@prisma/client';

const router = Router();

router.post('/purchase', checkRole(Role.CLIENT), createPurchase);
router.get('/purchases', checkRole(Role.CLIENT), getPurchasesByUser);

export default router;
