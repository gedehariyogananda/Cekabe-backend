import express from 'express';
import { authMiddleware } from '../middleware/auth_middleware.js';
import { getAllDocks, getAllDockVisibilities, getBookings, getSpesifyDockVisibilitieQueues } from '../controller/queue.controller.js';

const router = express.Router();

router.get('/queue',authMiddleware,getAllDocks)
router.get('/queue/:dock_id',authMiddleware,getBookings)

router.get('/dock-visibility', authMiddleware,getAllDockVisibilities)
router.get('/dock-visibility/:id', authMiddleware,getSpesifyDockVisibilitieQueues)

export default router