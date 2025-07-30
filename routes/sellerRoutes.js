import express from 'express'
import { isSellerAuthenticated, SellerLogin, sellerLogout } from '../controllers/SellerController.js';
import authSeller from '../middlewares/AuthSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', SellerLogin)

sellerRouter.post('/is-auth', authSeller, isSellerAuthenticated)

sellerRouter.post('/logout', sellerLogout)


export default sellerRouter



