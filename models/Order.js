import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {type: String, required:true, ref: 'User' },
    items: [{
        product: {type: String, required: true},
        quantity: {type: Number, required: true}
    }],
    amount: {type: Number, required: true},
    address: {type: String, required: true, ref: 'Address'},
    status: {type: String, default:'Order Placed'},
    paymentType: {type: String, required: true},
    isPaid: {type: Boolean, required: true, default: true},
}, {timestamps: true})

const orderModel = mongoose.models.order || mongoose.model('orders', orderSchema)


export default orderModel



