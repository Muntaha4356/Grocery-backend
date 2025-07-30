//Place the order

import orderModel from "../models/Order.js";
import productModel from "../models/ProductModel.js";


export const placeOrderCOD = async (req, res) => {
    try {
        const {userId, items,address} = req.body;
        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid Data"})
        }
        //Calculate the amount usingitems
        //accumulator: 
        let amount = await items.reduce(async(accumulator, item)=>{
            const product = await productModel.findById(item.product);
            return (await accumulator ) + product.offerPrice * item.quantity;
        }, 0)

        await orderModel.create({
            userId, items, amount, address, paymentType: "COD", 
        })
        return res.json({success: true, message:"Order place Successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


//All order details for seller or admin
//get order by user id
export const getOrderByUserId = async(req, res) => {
    try {
        const { userId } = req.body;

        // So it finds orders by the current user that were either COD or already paid online.
        const orders = await orderModel.find({
            userId, $or : [{paymentType: "COD"},
                {isPaid: true}
            ]
        }).populate("items.product address").sort({
            createdAt: -1 //descending order
        })
        res.json({success: true, orders})


    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//         .populate("items.product address")
//          This tells Mongoose to replace the ObjectIDs in:

//          items.product → likely references to a Product model

//          address → likely a reference to an Address model

//          with the actual documents from those collections. So you get full product and address info instead of just IDs.




//getAllordersforADMIN or Seller
export const getAllOrders = async(req, res) => {
    try {

        // So it finds orders by the current user that were either COD or already paid online.
        const orders = await orderModel.find({
            $or : [{paymentType: "COD"},
                {isPaid: true}
            ]
        }).populate("items.product address").sort({
            createdAt: -1 //descending order
        })
        res.json({success: true, orders})


    } catch (error) {
        res.json({success: false, message: error.message})
    }
}







