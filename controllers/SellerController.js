// 
import jwt from 'jsonwebtoken'


export const SellerLogin= async(req, res) =>{
    try {
        const {email, password} = req.body();

        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('sellerToken', token, {
                httpOnly : true,
                secure: process.env.NODE_ENV === 'production', //if NODE_ENV is in production... it's true else, it's false
                sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict', //strict: if same server i.e. local host, none: if different environment
                maxAge: 7 * 24 * 60 * 60 * 1000, //After 7days it should expire
                            
            })
            return res.json({success:true,message:"seller loggedIn"})

        }
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
        const {email, password} = req.body();

        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('sellerToken', token, {
                httpOnly : true,
                secure: process.env.NODE_ENV === 'production', //if NODE_ENV is in production... it's true else, it's false
                sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict', //strict: if same server i.e. local host, none: if different environment
                maxAge: 7 * 24 * 60 * 60 * 1000, //After 7days it should expire
                            
            })
            return res.json({success:true,message:"seller loggedIn"})

        }

}


export const isSellerAuthenticated =async(req, res) =>{
    try{
        
        return res.json({success: true})
        



    }catch(error){
        res.json({success: false, message: error.message})
    }
}


export const sellerLogout = async (req, res)=>{
    try{
        res.clearCookie('sellerToken', { //'token' here is the name of the token that we are deleting
            httpOnly : true,
            secure: process.env.NODE_ENV === 'production', //if NODE_ENV is in production... it's true else, it's false
            sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict', //strict: if same server i.e. local host, none: if different environment
                
            
        })
        return res.json({success : true, message:"seller Logged Out successfully"})
    }catch(e){
        res.json({success: false, message: error.message})
    }
}

