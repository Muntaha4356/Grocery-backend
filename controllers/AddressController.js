

//Add address

import Address from "../models/Address.js";

// /api/address/add
export const addAddress = async(req, res) => {
    try {
        const {userId, address} = req.body;
        await Address.create({...address, userId})
        res.json({success: true, message:"Address added successfully"});
    } catch (error) {
        res.json({success: false, message: error.message})
    }

}

//get adrresses : /api/address/get
export const getAddress = async (req, res) => {
    try {
        const {userId} = req.body;
        const AddressList = await Address.find({userId});
        return res.json({success: true, AddressList})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}





