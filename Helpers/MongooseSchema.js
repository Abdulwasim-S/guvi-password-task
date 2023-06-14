import mongoose from "mongoose";

const signUp = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})
const login = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        default:""
    },
})

export const UserSchema = mongoose.model('users',signUp)
export const LogInSchema = mongoose.model('user',login)
