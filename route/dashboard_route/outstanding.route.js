import express from 'express';
import { authMiddleware } from '../../middleware/auth_middleware.js';
import { getAllOutstanding } from '../../controller/dashboard_controller/outstanding.controller.js';

const router = express.Router();

router.get('/',authMiddleware,getAllOutstanding)

export default router