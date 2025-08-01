//UpdateCart

import userModel from "../models/userModel.js"

export const UpdateCart = async (req, res) => {
    try {
        const {cartItems} = req.body;
        const userId = req.body.userId;


        if (!userId) {
            return res.json({ success: false, message: "User ID not found in request body" });
        }


        const result = await userModel.findByIdAndUpdate(userId, {cartItems} )

        
        if (!result) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({success: true,message: "Updated The Cart"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}



