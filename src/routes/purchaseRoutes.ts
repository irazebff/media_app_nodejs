import { Router } from 'express';
import { createPurchase, getPurchasesByUser } from '../controllers/purchaseController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createPurchase);
router.get('/', authMiddleware, getPurchasesByUser);

export default router;
