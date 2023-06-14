import jwt from 'jsonwebtoken';
import {} from 'dotenv/config.js';

export const isAuth = async(req,res,next)=>{
    try {
        if(req.headers){
            const token = req.headers['x-auth-token'];
            const decode = await jwt.verify(token,process.env.SECRET_KEY);
            if(decode){
                next();
            }
        }
    } catch (error) {
        res.status(500).json({message:"Try Again later",error})
    }
}