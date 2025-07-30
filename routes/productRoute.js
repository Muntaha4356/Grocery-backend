import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/AuthSeller.js';
import { addProductController, changeStock, ProductByID, productListController } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add-product', upload.array(["images"]), authSeller, addProductController )
productRouter.get('/list', productListController)
productRouter.get('/id', ProductByID)
productRouter.post('/stock', authSeller, changeStock)


export default productRouter
