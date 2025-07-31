// Adding product... displaying list of products... modifying the stock ...
import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/ProductModel.js';

export const addProductController = async(req, res)=>{
    
    try {
        let productData = JSON.parse(req.body.poductData);
        const images = req.files //get images fomfiles
        let imageUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,
                    {resource_type: 'image'}
                );
                return result.secure_url
            })
        )

        await productModel.create({...productData, image: imageUrl})

        res.json({success:true, message: "Product Adddedd"})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const productListController = async(req, res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true, products})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
    
}

//get single product
export const ProductByID = async(req, res)=>{
    try {
        const {id} =req.body
        const products = await productModel.findById(id);
        res.json({success:true, products})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const changeStock = async(req, res)=>{
    try {
        const {id, inStock} =req.body;
        await productModel.findByIdAndUpdate(id, {inStock})
        res.json({success:true, message: "Stock Updated"})


    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


