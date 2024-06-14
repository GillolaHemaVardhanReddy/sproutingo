import User from '../models/user.model.js'
import mongoose from "mongoose"
import { returnError } from '../utils/error.js'
import Product from '../models/product.model.js'
import Like from '../models/likes.model.js'
import chalk from "chalk"

export const getAllUsers = async (req, res, next) => {
    if (req.role === 'user') return next(returnError(401, 'Unauthorized user'))
    try {
        console.log(chalk.blue.bgWhite('entered into getAllUsers controller'))
        const users = await User.find()
        console.log(chalk.green.bgWhite('successfully cleared rules and sent response'))
        res.status(200).json({success:true,data:users})
    } catch (err) {
        console.log(chalk.red.bgWhite('error in getAllUsers controller: ',err.message))
        next(err)
    }
}

export const getUserById = async (req, res, next) => {
    if (req.role === 'user') return next(returnError(401, 'Unauthorized user'))
    try {
        console.log(chalk.blue.bgWhite('entered into getUsersById controller'))
        if (!mongoose.isValidObjectId(req.params.id))
            return next(returnError(400, 'Invalid user id'));
        const user = await User.findById(req.params.id)
        if (!user) return next(returnError(404, 'user not found'))
        if(user.isdeleted){
            return next(returnError(404,'user deleted please contact'))
        }
        console.log(chalk.green.bgWhite('successfully cleared rules and sent response'))
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        console.log(chalk.red.bgWhite('error in getUserById controller: ',err.message))
        next(err)
    }
}

export const getUserDetails = async (req, res, next) => {
    try{
        console.log(chalk.blue.bgWhite('entered into getUserDetails controller'))
        const user = await User.findById(req.user.id)
        if (!user) {
            return next(returnError(404, 'User not found'));
        }
        
        console.log(chalk.green.bgWhite('successfully cleared rules and sent response'))
        res.status(200).json({
            success: true,
            data: user
        }) 
    }catch(err){
        console.log(chalk.red.bgWhite('error in getUserDetails controller: ',err.message))
        next(err)
    }
}

export const deleteUserAccount = async (req, res, next) => {
    if (req.role === 'admin') {
        return next(returnError(401, "Can't delete admin account"));
    }

    try {
        console.log(chalk.blue.bgWhite('entered into deleteUserAccount controller'))
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(returnError(404, "User not found"));
        }

        if (user.isdeleted) {
            return next(returnError(409, "User already deleted, contact support team"));
        }

        const result = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: { isdeleted: true } },
            { new: true }
        );

        if (!result) {
            return next(returnError(404, "User not found"));
        }
        console.log(chalk.green.bgWhite('successfully cleared rules and sent response'))
        res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        });
    } catch (err) {
        console.log(chalk.red.bgWhite('error in deleteUserAccount controller: ',err.message))
        next(err);
    }
}


export const updateUser = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(returnError(400, 'Enter valid details to update'));
    }

    try {
        console.log(chalk.blue.bgWhite('entered into updateUser controller'))
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $set: req.body },
            { new: true }
        );

        if (!updatedUser) {
            return next(returnError(404, "User not found"));
        }

        console.log(chalk.green.bgWhite('successfully cleared rules and sent response'))
        res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (err) {
        console.log(chalk.red.bgWhite('error in updateUser controller: ',err.message))
        next(err);
    }
};


export const addToCart = async (req, res, next) => {
    try {
        console.log(chalk.blue.bgWhite('entered into addToCart controller'))
        const userId = req.user.id; 
        
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity < 1) {
            return res.status(400).json({ error: "Invalid product ID or quantity" });
        }

        const product = await Product.findById(productId);

        if(product.isdeleted || !product.available){
            return next(returnError(409,'cant add unavailable data to cart'))
        }

        if (!product) {
            return res.status(404).json({ success:false, error: "Product not found" });
        }

        const price = product.price * quantity; 

        const user = await User.findById(userId);

        const existingProductIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (existingProductIndex > -1) {
            user.cart[existingProductIndex].quantity += quantity;
        } else {
            user.cart.push({ productId, quantity, price });
        }

        await user.save();
        console.log(chalk.green.bgWhite('successfully cleared rules and sent response'))
        res.status(200).json({success:true, message: "Product added to cart", data: user.cart });
    } catch (err) {
        console.log(chalk.red.bgWhite('error in addToCart controller: ',err.message))
        next(returnError(err));
    }
};

export const getCartDetails = async (req, res, next) => {
    try {
        console.log(chalk.blue.bgWhite('entered into getCartDetails controller'))
        const userId = req.user.id; // Authenticated user ID from the middleware

        // Find the user and populate the cart product details
        const user = await User.findById(userId).populate('cart.productId', 'name price thumb_img');

        if (!user) {
            return next(returnError(404,'user not found'))
        }

        console.log(chalk.green.bgWhite('successfully cleared rules and sent response'))
        res.status(200).json({success:true, data: user.cart });
    } catch (err) {
        console.log(chalk.red.bgWhite('error in getCartDetails controller: ',err.message))
        next(returnError(err));
    }
};

export const editCart = async (req, res, next) => {
    try {
        console.log(chalk.blue.bgWhite('entered into editCart controller'))
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
            user.cart[productIndex].price = ((user.cart[productIndex].price)/user.cart[productIndex].quantity)*quantity
            user.cart[productIndex].quantity = quantity;
        }

        await user.save();

        console.log(chalk.green.bgWhite('successfully cleared rules and sent response'))
        res.status(200).json({ success:true, message: "Cart updated successfully", data: user.cart });
    } catch (err) {
        console.log(chalk.red.bgWhite('error in editCart controller: ',err.message))
        next(returnError(err));
    }
};

export const deleteCartProduct = async (req,res,next)=>{
    try{
        console.log(chalk.blue.bgWhite('entered into deleteCartProduct controller'))
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

        console.log(chalk.green.bgWhite('successfully cleared rules and sent response'))
        res.status(200).json({success:true,message:"successfullt deleted"})
    }catch(err){
        console.log(chalk.red.bgWhite('error in deleteCartProduct controller: ',err.message))
        next(returnError(err));
    }
}

export const getWishlist = async (req, res, next) => {
    try {
        console.log(chalk.blue.bgWhite('entered into getWishlist controller'))
        const userId = req.user.id; 

        const likedProducts = await Like.find({ userId }).populate('productId');

        if(!likedProducts){
            return next(returnError(404,"no products found in wishlist"))
        }
        
        const productIds = likedProducts.map(like => like.productId);

        const productsDetails = await Product.find({ _id: { $in: productIds } });

        console.log(chalk.green.bgWhite('successfully cleared rules and sent response'))
        res.status(200).json({success:true, data: productsDetails });
    } catch (err) {
        console.log(chalk.red.bgWhite('error in deleteCartProduct controller: ',err.message))
        next(returnError(err));
    }
};

export const userGlobalSearch = async (req, res, next) => {
    try {
        console.log(chalk.blue.bgWhite('entered into userGlobalSearch controller'))
        const searchTerm = req.query.q;
        if (!searchTerm) {
            return res.status(400).json({ success:false, message: "search can't be empty" });
        }  

        if (searchTerm.length < 3) {
            return res.status(400).json({ success:false, message: "Search term must be at least 3 characters long" });
        }


        const regex = new RegExp(searchTerm, 'i');

        let deletedFilter = {isdeleted: false}

        if(req.role==='admin'){
            deletedFilter = {}
        }

        const filter = [
            deletedFilter,
            {
                $or: [
                    { name: regex },
                    { email: regex },
                    {$expr: {
                        $regexMatch: {
                            input: { $toString: "$phone" },
                            regex: searchTerm,
                            options: "i"
                        }
                    }},
                    {address: {
                        $elemMatch: {
                          $or: [
                            { street: regex },
                            { city: regex },
                            { country: regex },
                            { state: regex },
                            { pincode: regex },
                            { type: regex }
                          ]
                        }
                    }}
                ]
            }
        ]
        
        const users = await User.find(
            {$and : filter}
        );
        if(users.length===0) return next(returnError(404,"no user found"))

        console.log(chalk.green.bgWhite('successfully cleared rules and sent response'))
        res.status(200).json({ success:true, data: users });
    }catch(err){
        console.log(chalk.red.bgWhite('error in userGlobalSearch controller: ',err.message))
        next(err)
    }
}