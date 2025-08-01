import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Register user
export const registerController = async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.json({success: false,message: 'Missing details'})
    }
        
    try{
        const userExist = await userModel.findOne({email});
        if (userExist){
            return res.json({success: false,message:" User Already exists "});

        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new userModel({name, email, password: hashedPassword});
        await user.save();

        const token_applied = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token_applied, {
            httpOnly : true,
            secure: process.env.NODE_ENV === 'production', //if NODE_ENV is in production... it's true else, it's false
            sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict', //strict: if same server i.e. local host, none: if different environment
            maxAge: 7 * 24 * 60 * 60 * 1000, //After 7days it should expire

        })


        return res.json({success: true, user: {email: user.email, name: user.name}});
        
    }catch(error){
        res.json({success: false, message: error.message})
    }
}




export const loginController = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({success: false,message: 'Missing details'})
    }
    try{
        const userExist = await userModel.findOne({email})
        
            if (!userExist){
                return res.json({success: false,message:" User doesn't exist "});
                
            }
            //unhasedPassword
            const isPasswordMatch = await bcrypt.compare(password, userExist.password)
            if(!isPasswordMatch){
                return res.json({success: false, message: 'Password does not match'});
 
            }

            const token_applied = jwt.sign({id: userExist._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
            
                    //send token -> user in response -> add cookie(token is sent through it) to response
            res.cookie('token', token_applied, {
                httpOnly : true,
                secure: process.env.NODE_ENV === 'production', //if NODE_ENV is in production... it's true else, it's false
                sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict', //strict: if same server i.e. local host, none: if different environment
                maxAge: 7 * 24 * 60 * 60 * 1000, //After 7days it should expire
                        
            })
            return res.json({success: true , user: {email: userExist.email, name: userExist.name}});
    }catch(error){
        res.json({success: false, message: error.message})       
    }
}


export const isAuthenticated =async(req, res) =>{
    try{
        const {userId} = req.body;
        if(!userId){
            return res.json({success: false,message: "User id not found"})
        }
        const userExist = await userModel.findById(userId);
        if (!userExist) {
            return res.json({ success: false, message: "User not found" });
        }
        if (userExist.status==false){
            return res.json({success: false, message: "Account Not Verified"})

        }
        return res.json({success: true, message: "Account Verified",
            user: userExist
        })
        



    }catch(error){
        res.json({success: false, message: error.message})
    }
}



export const Logout = async (req, res)=>{
    try{
        res.clearCookie('token', { //'token' here is the name of the token that we are deleting
            httpOnly : true,
            secure: process.env.NODE_ENV === 'production', //if NODE_ENV is in production... it's true else, it's false
            sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict', //strict: if same server i.e. local host, none: if different environment
                
            
        })
        return res.json({success : true, message:"Logged Out successfully"})
    }catch(e){
        res.json({success: false, message: error.message})
    }
}
