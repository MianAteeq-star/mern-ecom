import JWT from 'jsonwebtoken'
import UserModel from '../model/UserModel.js'



export const requireSignIn =  (req,res,next)=>{
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        )
        req.user = decode
        next()
    } catch (error) {
        console.log(error);
    }



    
}



// admin access


export const isAdmin= async  (req,res,next)=>{
    try {
        const user = await UserModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "You are not admin"
            })
        }else{
            next()
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in admin middleware"
        })
    }
}