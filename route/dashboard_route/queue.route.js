import express from 'express';
import { authMiddleware } from '../../middleware/auth_middleware.js';
import { getAllDocks, getBookings } from '../../controller/dashboard_controller/queue.controller.js';

const router = express.Router();

router.get('/',authMiddleware,getAllDocks)
router.get('/:dock_id',authMiddleware,getBookings)

export default router