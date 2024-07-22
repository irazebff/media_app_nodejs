import { Router } from 'express';
import upload from '../middlewares/multer';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController';
import { checkPermission } from '../middlewares/checkPermission';

const router = Router();

router.get('/items', checkPermission('CLIENT'), getItems);
router.get('/items/:id', checkPermission('CLIENT'), getItem);
router.post('/items', checkPermission('ADMIN'), upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), createItem);
router.put('/items/:id', checkPermission('ADMIN'), upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), updateItem);
router.delete('/items/:id', checkPermission('ADMIN'), deleteItem);

export { router };
