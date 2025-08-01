import mongoose from "mongoose";

const connectDb =  async () => {
    try{
        mongoose.connection.on('connected',()=> console.log("db connected"));
        await mongoose.connect(process.env.MONGODB_URI)
    }catch(error){
        console.error(error.message);
    }
}

export default connectDb