import jwt from 'jsonwebtoken'

const authSeller = async (req, res, next) =>{
    const {sellerToken} = req.cookies;

    if(!sellerToken){
        return res.json({success:false, message: "Not Authorized"});

    }
    try{
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if(tokenDecode.email === process.env.SELLER_EMAIL){
            req.seller = tokenDecode;
            next() //if Id is available we are sending it to the body
        }else{
            return res.json({success:false, message:"Token doesn't have id"})
        }
    
    
    }catch(error){
        res.json ({success: false,message: error.message})
    }

}



export default authSeller


