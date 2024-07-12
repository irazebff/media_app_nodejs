import { Router } from 'express';
import * as eventController from '../controllers/eventController';

const router = Router();

router.get('/events', eventController.getEvents);
router.get('/events/:id', eventController.getEvent);
router.post('/events', eventController.createEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

export { router as eventRoutes };
