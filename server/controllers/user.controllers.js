import User from '../models/user.model.js'
import mongoose from "mongoose"
import { returnError } from '../utils/error.js'

export const getAllUsers = async (req, res, next) => {
    if (req.role === 'user') return next(returnError(401, 'Unauthorized user'))
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

export const getUserById = async (req, res, next) => {
    if (req.role === 'user') return next(returnError(401, 'Unauthorized user'))
    try {
        if (!mongoose.isValidObjectId(req.params.id))
            return next(returnError(400, 'Invalid user id'));
        const user = await User.findById(req.params.id)
        if (!user) return next(returnError(404, 'user not found'))
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        next(err)
    }
}

export const getUserDetails = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id)
        res.status(200).json({
            success: true,
            data: user
        }) 
    }catch(err){
        next(err)
    }
}

export const deleteUserAccount = async(req,res, next) =>{
    if(req.role === 'admin')
    return next(returnError(401, "Can't delete admin account"))
    try{
        await User.findByIdAndDelete(req.user.id)
        res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        })
    }catch(err){
        next(err)
    }
}

export const updateUser = async(req, res, next) => {
    if (Object.keys(req.body).length === 0) return next(returnError(400, 'enter valid details to update'));
    try{
        const updatedUser = await User.findByIdAndUpdate({_id: req.user.id},{
            $set: req.body
        },{new: true})
        res.status(200).json({
            success: true,
            data: updatedUser
        })
    }catch(err){
        next(err)
    }
}

export const getCartDetails = async(req, res, next) =>{
    try{
        const user = await User.findById(req.user.id)
        const cartDetails = user.cart
        res.status(200).json({
            success: true,
            data: cartDetails
        })
    }catch(err){
        next(err)
    }
}

// export const addToCart = async(req, res, next) =>{
//     try{
//         const user = await User.findByIdAndUpdate({_id: req.user.id},{
//             $push: {cart: {
//                 productId: req.params.id,
//                 quantity: 1
//             }}   
//         },{new : true})
//         res.status(201).json({
//             success:true,
//             message:'product added to cart'
//         })
//     }catch(err){
//         next(err)
//     }
// }
