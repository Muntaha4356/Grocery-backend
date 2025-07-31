import express from 'express';
import userAuth from '../middlewares/AuthUser.js';
import { getAllOrders, getOrderByUserId, placeOrderCOD } from '../controllers/orderController.js';
import authSeller from '../middlewares/AuthSeller.js';


const orderRouter = express.Router();

orderRouter.post("/cod", userAuth, placeOrderCOD)
orderRouter.get("/user", userAuth, getOrderByUserId)
orderRouter.get("/seller", authSeller, getAllOrders)


export default orderRouter