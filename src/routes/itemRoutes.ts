import { Router } from 'express';
import upload from '../middlewares/multer';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController';

const router = Router();

router.get('/items', getItems);
router.get('/items/:id', getItem);
router.post('/items', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), createItem);
router.put('/items/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), updateItem);
router.delete('/items/:id', deleteItem);

export { router };
