import express from 'express';
import { authMiddleware } from '../../middleware/auth_middleware.js';
import { bookingMain, customers, gateLocation, goodsType, vehiclesType } from '../../controller/booking_controller/booking-schedule.controller.js';

const router = express.Router();

router.get('/available-docks',authMiddleware, gateLocation)
router.get('/customers', authMiddleware, customers)
router.get('/goods-type', authMiddleware, goodsType)
router.get('/vehicles-type', authMiddleware, vehiclesType)
router.post('/', authMiddleware, bookingMain)

export default router