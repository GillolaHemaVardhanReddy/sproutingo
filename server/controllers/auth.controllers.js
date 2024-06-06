import User from "../models/user.model.js"
import { returnError } from "../utils/error.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import mongoose from "mongoose"
import sgMail from '@sendgrid/mail'
dotenv.config()
sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

export const signup = async (req,res,next)=>{ // body is email,name,password
    try{
        const isUser = await User.findOne({email:req.body.email})
        if(isUser) return next(returnError(409,'user already exist'))
        const newUser = User(req.body)
        await newUser.save()
        const {password , ...remain} = newUser.toObject();
        res.status(201).json(remain)
    }catch(err){
        if (err instanceof mongoose.CastError) return next(returnError(400, 'enter valid details to update'));
        if (err.name === 'ValidationError') return next(returnError(400, 'Validation Error'));
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


export const signout = async (req,res,next)=>{
    try{
        res.clearCookie('auth', { maxAge: 0 })
        res.status(200).json('logged out successfully')
    }catch(err){
        next(err)
    }
}

export const signupmail = async (req,res,next)=>{
    const {name,email,password} = req.body
    try{
        const resp = await User.findOne({email})
        if(resp){
            return next(returnError(400,'email is already taken'))
        }
        const token = jwt.sign({name,email,password},process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:'10m'})
        const emailData = {
            from: process.env.EMAIL_FROM,
            to:email,
            subject: 'Account activation Link',
            html:`
                <h1>Greetings from sproutingo!</h1>
                <p>please use the below link to activate your account</p>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr/>
                <h3>If its not you please reach out ASAP</h3>
                <p>This email contains sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        }
        await sgMail.send(emailData)
        console.log('signup email sent successful')
        res.json({
            message: `Email has been sent to ${email} .Follow the instruction to activate your account`
        })
        
    }catch(err){
        next(err)
    }
}

export const Activate = async (req,res,next)=>{
    const {token} = req.body;
    try{
        if(token){
            try{
                const decodedToken = jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION)
                const {name,email,password} = jwt.decode(token)
                const newUser = new User({name,email,password})
                await newUser.save()
                res.json({
                    message: 'Signup successful'
                })
            }catch(err){
                console.log(err.message)
                return next(returnError(401,'Link expired please signup again'))
            }
        }else{
            console.log('token dosent exist')
            return next(returnError(404,'Un autharised Token'))
        }
    }catch(err){
        console.log(err.message)
        next(err)
    }   
}