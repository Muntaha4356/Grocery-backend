import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {type: String, required},
    firstName: {type: String, required},
    lastName: {type: String, required},
    email: {type: String, required},
    street: {type: String, required},
    city: {type: String, required},
    state: {type: String, required},
    zipcode: {type: Number, required},
    country: {type: String, required},
    phone: {type: String, required},
})


const Address = mongoose.models.address || mongoose.model('address', addressSchema)


export default Address

