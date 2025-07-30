//UpdateCart

import userModel from "../models/userModel.js"

export const UpdateCart = async (req, res) => {
    try {
        const {userId, cartItems} = req.body
        await userModel.findByIdAndUpdate(userId, {cartItems} )
        res.json({success: true,message: "Updated The Cart"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}



