import mongoose from "mongoose"
import User from "../models/user.model.js"
import { returnError } from "../utils/error.js"
import bcrypt from 'bcrypt'

export const checkForUserSignup = async (email) => {
    try {
        const isUser = await User.findOne({email})
        if(isUser) throw returnError(409,'user already exist')
        else return;
    } catch (err) {
        throw err
    }
}

export const createHashAndSave = async (body)=>{ 
    try{
        const salt = await bcrypt.genSalt();
        body.password = await bcrypt.hash(body.password,salt);
        const newUser = User(body)
        await newUser.save()
        return newUser 
    }catch(err){
        if(err.code===11000) throw returnError(409,`${Object.keys(err.keyPattern)[0]} already exist`)
        throw returnError(500,"password encryption error")
    }
}

export const checkForUserSignin = async (email)=>{
    try{
        const user = await User.findOne({email})
        if(!user) throw returnError(404,'user not found please signup')
        else return user
    }catch(err){
        throw err
    }
}

export const checkPassword = async (password,hashPassword)=>{
    try{
        const isCorrect = await bcrypt.compare(password,hashPassword)
        if(!isCorrect) throw returnError(401,'password or email is incorrect')
        else return;
    }catch(err){
        throw err;
    }
}