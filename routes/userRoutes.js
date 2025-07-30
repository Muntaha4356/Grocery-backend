import express from 'express'
import { isAuthenticated, loginController, Logout, registerController } from '../controllers/userController.js';
import userAuth from '../middlewares/AuthUser.js';

const userRouter = express.Router();

userRouter.post('/register', registerController)
userRouter.post('/login', loginController)
userRouter.get('/isAuth', userAuth ,isAuthenticated)
userRouter.get('/logout', userAuth, Logout)

export default userRouter