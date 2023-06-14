import express from 'express';
import { LogInSchema, UserSchema } from '../Helpers/MongooseSchema.js';
import { generateToken } from '../Helpers/Generatetoken.js';
import { isAuth } from '../Helpers/isAuth.js';
import nodemailer from 'nodemailer';
import { generateHashedPassword, verifyHashedPassword } from '../Helpers/HashPassword.js';

const router = express.Router();

router.get('/login',async(req,res)=>{
    try {
        const user = await LogInSchema.findOne({email:req.body.email});
        if(!user){
            return res.status(500).json({message:"Invalid credential"});
        }
        const password = await verifyHashedPassword(req.body.password,user.password);
        if(!password){
            return res.status(500).json({message:"Invalid credential"});
        }
        res.status(200).json({message:"LogIn success"})
    } catch (error) {
        res.status(400).json({message:'Cant get',error})
    }
})
router.get('/forgetpassword',async(req,res)=>{
    try {
        const user = await LogInSchema.findOne({email:req.body.email});
        if(!user){
            return res.status(500).json({message:"Invalid credential"});
        }
        const token = await generateToken(req.body.email);

        const mailCreate={
            service:'gmail',
            auth: {
              user: process.env.USER, 
              pass: process.env.PASS,
            },
          }

        const message = {
            from: 'abdulwasimsguvi@gmail.com',
            to: req.body.email,
            subject: "Password reset", 
            text: "Password reset", 
            html: "<button>Click here to reset</button>", 
          }

        let transporter = nodemailer.createTransport(mailCreate);
        
          let info = await transporter.sendMail(message);
        

        res.status(200).json({message:"Check your email",token});
        
    } catch (error) {
        res.status(400).json({message:'Try again later',error})
    }
})
router.put('/resetpassword',isAuth,async(req,res)=>{
    try {
        const user = await LogInSchema.findOne({email:req.body.email});
        if(!user){
            return res.status(500).json({message:"Invalid credential"});
        }
        const password = await generateHashedPassword(req.body.password);
        const updatedUser = await LogInSchema.updateOne({email:req.body.email},{$set:{"password":password}});
        res.status(200).json({message:"Updated Success",updatedUser});
        
    } catch (error) {
        res.status(400).json({message:'Unable to reset password'})
    }
})
router.post('/signup',async(req,res)=>{
    try {
        const user = await UserSchema.findOne({email:req.body.email});
        if(user){
            return res.status(500).json({message:"user already exist"})
        }
        const password = await generateHashedPassword(req.body.password);
        const newUser = await UserSchema({
            username:req.body.username,
            email:req.body.email,
            password:password
        }).save();
        res.status(200).json({message:"SignUp success",newUser})

    } catch (error) {
        res.status(400).json({message:'Cant post',error})
    }
})

export const RouterPage=router;