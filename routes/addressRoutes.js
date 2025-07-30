import express from 'express';
import { addAddress, getAddress } from '../controllers/AddressController.js';
import userAuth from '../middlewares/AuthUser.js';


const addressRouter = express.Router();


addressRouter.post('/add', userAuth, addAddress);
addressRouter.get('/get', userAuth, getAddress);



export default addressRouter
