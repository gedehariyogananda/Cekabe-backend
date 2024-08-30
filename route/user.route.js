import express from 'express'
import {getDetail, loginController, registerController} from '../controller/user.controller.js'
import { authMiddleware } from '../middleware/auth_middleware.js'

const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/me', authMiddleware,getDetail)

export default router