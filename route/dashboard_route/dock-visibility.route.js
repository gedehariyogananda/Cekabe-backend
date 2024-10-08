import express from 'express';
import { authMiddleware } from '../../middleware/auth_middleware.js';
import { getAllDockVisibilities, getAllGates, getSpesifyDockVisibilitieQueues } from '../../controller/dashboard_controller/dock-visibility.controller.js';

const router = express.Router();

router.get('/',authMiddleware,getAllDockVisibilities)
router.get('/:id',authMiddleware,getSpesifyDockVisibilitieQueues)
router.get('/all-location/gates', authMiddleware,getAllGates)

export default router