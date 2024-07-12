import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.get('/posts', productController.getPosts);

export default router;
