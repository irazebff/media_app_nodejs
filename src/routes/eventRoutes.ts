import { Router } from 'express';
import * as eventController from '../controllers/eventController';
import { checkPermission } from '../middlewares/checkPermission';

const router = Router();

router.get('/events', checkPermission('CLIENT'), eventController.getEvents);
router.get('/events/:id', checkPermission('CLIENT'), eventController.getEvent);
router.post('/events', checkPermission('ADMIN'), eventController.createEvent);
router.put('/events/:id', checkPermission('ADMIN'), eventController.updateEvent);
router.delete('/events/:id', checkPermission('ADMIN'), eventController.deleteEvent);

export { router as eventRoutes };
