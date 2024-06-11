import User from '../models/user.model.js'
import mongoose from "mongoose"
import { returnError } from '../utils/error.js'
import Product from '../models/product.model.js'
import Like from '../models/likes.model.js'

export const getAllUsers = async (req, res, next) => {
    if (req.role === 'user') return next(returnError(401, 'Unauthorized user'))
    try {
        const users = await User.find()
        res.status(200).json({success:true,data:users})
    } catch (err) {
        console.error("Error in get all users controller");
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
        console.error("Error in get user by id controller");
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
        console.error("Error get user details controller");
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
        console.error("Error delete user controller");
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
        console.error("Error updating user controller");
        next(err)
    }
}

export const addToCart = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity < 1) {
            return res.status(400).json({ error: "Invalid product ID or quantity" });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success:false, error: "Product not found" });
        }

        const price = product.price; 

        const user = await User.findById(userId);

        const existingProductIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (existingProductIndex > -1) {
            user.cart[existingProductIndex].quantity += quantity;
        } else {
            user.cart.push({ productId, quantity, price });
        }

        await user.save();

        res.status(200).json({success:true, message: "Product added to cart", data: user.cart });
    } catch (err) {
        console.error("Error add to cart controller");
        next(returnError(err));
    }
};

export const getCartDetails = async (req, res, next) => {
    try {
        const userId = req.user.id; // Authenticated user ID from the middleware

        // Find the user and populate the cart product details
        const user = await User.findById(userId).populate('cart.productId', 'name price thumb_img');

        if (!user) {
            return next(returnError(404,'user not found'))
        }

        res.status(200).json({success:true, data: user.cart });
    } catch (err) {
        console.error("Error get cart controller");
        next(returnError(err));
    }
};

export const editCart = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return next(returnError(400,"Invalid product ID or quantity"))
        }

        const user = await User.findById(userId);

        const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (productIndex === -1) {
            return next(returnError(400,"Product not found in cart"))
        }

        if (quantity === 0) {
            user.cart.splice(productIndex, 1);
        } else {
            user.cart[productIndex].quantity = quantity;
        }

        await user.save();

        res.status(200).json({ success:true, message: "Cart updated successfully", data: user.cart });
    } catch (err) {
        console.error("Error edit cart controller");
        next(returnError(err));
    }
};

export const deleteCartProduct = async (req,res,next)=>{
    try{
        const userId = req.user.id; 
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return next(returnError(400,"Invalid product ID or quantity"))
        }

        const user = await User.findById(userId);

        const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (productIndex === -1) {
            return next(returnError(400,"Product not found in cart"))
        }

        user.cart.splice(productIndex, 1);
         
        await user.save()
        res.status(200).json({success:true,message:"successfullt deleted"})
    }catch(err){
        console.error("Error delet cart controller");
        next(returnError(err));
    }
}

export const getWishlist = async (req, res, next) => {
    try {
        const userId = req.user.id; 

        const likedProducts = await Like.find({ userId }).populate('productId');

        if(!likedProducts){
            return next(returnError(404,"no products found in wishlist"))
        }
        
        const productIds = likedProducts.map(like => like.productId);

        const productsDetails = await Product.find({ _id: { $in: productIds } });

        res.status(200).json({success:true, data: productsDetails });
    } catch (err) {
        console.error("Error get list controller");
        next(returnError(err));
    }
};

