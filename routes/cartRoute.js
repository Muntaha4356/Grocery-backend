import express from 'express';
import userAuth from '../middlewares/AuthUser.js';
import { UpdateCart } from '../controllers/cartController.js';


const cartRouter = express.Router();
cartRouter.post('/update', userAuth, UpdateCart)

export default cartRouter;