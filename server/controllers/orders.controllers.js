import mongoose from "mongoose";
import orders from "../models/orders.model.js";
import Product from "../models/product.model.js";
import { returnError } from "../utils/error.js"
import User from "../models/user.model.js";

export const createOrder = async (req, res, next) => { // todo validate order input
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if(user.cart.length<=0) return next(returnError(409,'Cart is empty add products to checkout'))
        const new_order = {
            userId: user._id,
            products: user.cart,
        };

        const newOrder = new orders(new_order);

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { cart: [] } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'Failed to update user cart' });
        }

        await newOrder.save();

        res.status(201).json(newOrder);
    } catch (err) {
        next(err);
    }
};

export const getTotalOrdersDelivered =  async (req,res,next)=> {
    if(req.role==='user') return next(returnError(401,'Unauthorized user'));
    try{
        const totalOrdersDelivered = await orders.find({isDelivered:true}); 
        res.status(200).json(totalOrdersDelivered);
    }
    catch(err){
        next(err);
    }
}

export const getTotalOrdersNotDelivered =  async (req,res,next)=> {
    if(req.role==='user') return next(returnError(401,'Unauthorized user'));
    try{
        const totalOrdersNotDelivered = await orders.find({isDelivered:false}); 
        res.status(200).json(totalOrdersNotDelivered);
    }
    catch(err){
        next(err);
    }
}

export const getNotDeliveredOrdersByDate =  async (req,res,next)=> {
    if(req.role==='user') return next(returnError(401,'Unauthorized user'));
    try{
        const currDate = new Date(req.params.Date).toISOString();
        const date = new Date(req.params.Date); 
        date.setDate(date.getDate()+1);
        const nextDate = date.toISOString();
        const totalOrdersNotDelivered = await orders.find({isDelivered:false,
            deliveredDate:{
                $gte:currDate,
                $lt:nextDate
            }
        }); 
        res.status(200).json({
            success:true,
            data:totalOrdersNotDelivered
        });
    }
    catch(err){
        next(err);
    }
}

export const getDeliveredOrdersByDate =  async (req,res,next)=> {
    if(req.role==='user') return next(returnError(401,'Unauthorized user'));
    try{
        const currDate = new Date(req.params.Date).toISOString();
        const date = new Date(req.params.Date); 
        date.setDate(date.getDate()+1);
        const nextDate = date.toISOString();
        const totalOrdersDelivered = await orders.find({isDelivered:true,
            deliveredDate:{
                $gte:currDate,
                $lt:nextDate
            }
        }); 
        res.status(200).json({
            success:true,
            data:totalOrdersDelivered
        });
    }
    catch(err){
        next(err);
    }
}

export const getDeliveredOrdersByProductName = async (req,res,next) => {
    if(req.role==='user') return next(returnError(401,'Unauthorized user'));
    try{
        const productName = req.params.productName;
        const productIds = await Product.aggregate([
            { 
                $match: { name: productName }
            },
            {
                $project: { _id: 1 }
            }

        ]);
        const productIdValues = productIds.map(obj =>  new mongoose.Types.ObjectId(obj._id));
        const totalDeliveredOrdersByProductName = await orders.find({
            products: {
                $elemMatch: {
                    productId: { $in: productIdValues }
                }
            },
            isDelivered:true
        });
        res.status(200).json({
            success:true,
            data:totalDeliveredOrdersByProductName
        });
    } catch(err){
        next(err);
    }
}


export const getNotDeliveredOrdersByProductName = async (req,res,next) => {
    if(req.role==='user') return next(returnError(401,'Unauthorized user'));
    try{
        const productName = req.params.productName;
        const productIds = await Product.aggregate([
            { 
                $match: { name: productName }
            },
            {
                $project: { _id: 1 }
            }

        ]);
        const productIdValues = productIds.map(obj =>  new mongoose.Types.ObjectId(obj._id));
        const totalNotDeliveredOrdersByProductName = await orders.find({
            products: {
                $elemMatch: {
                    productId: { $in: productIdValues }
                }
            },
            isDelivered:false
        });
        res.status(200).json({
            success:true,
            data:totalNotDeliveredOrdersByProductName
        });
    } catch(err){
        next(err);
    }
}

export const getDeliveredOrdersByUserId = async (req,res,next) =>{
    try{
    const deliveredOrders = await  orders.find({
        userId: req.user.id,
        isDelivered:true
    });
    res.status(200).json({
        success:true,
        data:deliveredOrders
    });
    } catch(err){
        next(err);
    }
}

export const getNotDeliveredOrdersByUserId = async (req,res,next) =>{
    try{
    const notDeliveredOrders = await  orders.find({userId: req.user.id,
        isDelivered:false});
    res.status(200).json({
        success:true,
        data:notDeliveredOrders
    });
    } catch(err){
        next(err);
    }
}

export const deleteOrder = async (req,res,next) => {
    try{
        const uid = req.params.id;
        const delorder = await orders.find({userId: uid});
        if(!delorder) return next(returnError(404,'Order doesnot exist'))
        let msg = !req.role==='admin' ? "delete req sent successfully" : "order deleted"
        if(req.role==='admin') await orders.findOneAndDelete({_id:uid});
        else {
            delorder.reqDelete = true;
            delorder.save()
        } 
        res.status(200).json({
            success:true,
            data:msg
        });
    } catch(err){
        next(err);
    }
}

export const getOrdersByOrderId = async (req,res,next) => {
    try{

        if (!mongoose.isValidObjectId(req.params.id)) 
            return next( returnError(400,'Invalid order id'));
        const orderDetails = await orders.findById(req.params.id)
        if(!orderDetails) return next(returnError(404,'order not found'))
        res.status(200).json({
            success:true,
            data:orderDetails
        })
    } catch(err){
        next(err);
    }
}

export const updateDetails = async (req,res,next) => {
    if(req.role==='user') return next(returnError(401,'Unauthorized user'));
    try{
        if (!mongoose.isValidObjectId(req.body.id)) 
            return next( returnError(400,'Invalid order id'));
        
    } catch(err) {
        next(err);
    }
}