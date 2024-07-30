import { Router } from 'express';
import { createPurchase, getPurchasesByUser } from '../controllers/purchaseController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/checkPermission';

const router = Router();

router.post('/', authMiddleware, checkPermission(['CLIENT']), createPurchase);
router.get('/', authMiddleware, checkPermission(['CLIENT']), getPurchasesByUser);

export default router;
