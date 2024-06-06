import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { returnError } from './error.js'

export const Authentication = async (req,res,next)=>{
    const token = req.signedCookies.auth
    try{
        const resp = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id:resp.id})
        req.user = {id:user.id};
        req.role = user.role
        next()
    }catch(err){
        next(returnError(500,'failed to authenticate'))
    }
}

export const filterProducts = async (req,res,next)=>{
    let token;
    if(req.signedCookies){
        token = req.signedCookies.auth
    }
    try{
        if(token){
            const resp = jwt.verify(token,process.env.JWT_SECRET)
            const user = await User.findOne({_id:resp.id})
            req.user = {id:user.id};
            req.role = user.role
        }
        next()
    }catch(err){
        next(err)
    }
}