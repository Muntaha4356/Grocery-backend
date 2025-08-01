//UpdateCart

import userModel from "../models/userModel.js"

export const UpdateCart = async (req, res) => {
    try {
        const {cartItems} = req.body;
        const userId = req.body.userId;
        


        if (!userId) {
            return res.json({ success: false, message: "User ID not found in request body" });
        }

        const user = await userModel.findById(userId)
        if(!user){
            return res.json({success: false, message: "User does not exist"})
        }

        const updatedCart = { ...user.cartItems, ...cartItems };

       for (const productId in updatedCart) {
            if (updatedCart[productId] === 0) {
                delete updatedCart[productId];
            }
        } 
        user.cartItems = updatedCart;
        await user.save();

        const result = await userModel.findByIdAndUpdate(userId, {cartItems} )


        if (!result) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({success: true,message: "Updated The Cart" , cart: updatedCart })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}



