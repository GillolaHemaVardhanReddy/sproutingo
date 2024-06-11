import mongoose from "mongoose";
import orders from "../models/orders.model.js";
import Product from "../models/product.model.js";
import { returnError } from "../utils/error.js"
import User from "../models/user.model.js";

export const checkUser = async (id)=>{
    try{
        const user = await User.findById(id);
        if (!user) {
            throw returnError(404, 'User not found')
        }
        if(user.cart.length<=0){
            throw returnError(409,'Cart is empty add products to checkout')
        }
        return user;
    }catch(err){
        throw err;
    }
}

export const createOrderAndSetCartToEmpty = async (id,data)=>{
    try{
        const newOrder = new orders(data);
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { cart: [] } },
            { new: true }
        );
        if (!updatedUser) {
            throw returnError(404,'Failed to update user cart' );
        }
        await newOrder.save();
        return newOrder
    }catch(err){
        throw err
    }
}