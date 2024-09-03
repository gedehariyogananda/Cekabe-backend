import express from 'express';
import { authMiddleware } from '../../middleware/auth_middleware.js';
import { getAllHistory } from '../../controller/dashboard_controller/history.controller.js';

const router = express.Router();

router.get('/',authMiddleware,getAllHistory)

export default router