import express from 'express';
import { getAllCustomers } from '../controller/customer.controller.js';

const router = express.Router();

router.get('/', getAllCustomers)

export default router