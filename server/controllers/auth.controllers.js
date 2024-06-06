import User from "../models/user.model.js"
import { returnError } from "../utils/error.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
dotenv.config()

export const signup = async (req,res,next)=>{ // body is email,name,password
    try{
        const newUser = User(req.body)
        await newUser.save()
        const {password , ...remain} = newUser.toObject();
        res.status(201).json(remain)
    }catch(err){
        if(err.code===11000) return next(returnError(409,'user already exist'))
        // if (err.name === 'ValidationError') return next(returnError(400, 'Validation Error'));
        next(err)
    }
}

export const signin = async (req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(user){
            const isCorrect = await bcrypt.compare(req.body.password,user.password)
            if(isCorrect){
                const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'10d'}) // expires in 2days
                const {password , ...remain} = user.toObject();
                res.cookie('auth',token, {
                     maxAge:2 * 24 * 60 * 60 * 1000,
                     signed: true,
                     httpOnly:true
                    } ).status(200).json({success:true,data:remain})
            }else{
                return next(returnError(401,'password or email is incorrect'))
            }
        }else{
            return next(returnError(404,'user not found please signup'))
        }
    }catch(err){
        next(err)
    }
}

export const activate = async (req,res,next)=>{
    try{
        
    }catch(err){
        next(err)
    }
}