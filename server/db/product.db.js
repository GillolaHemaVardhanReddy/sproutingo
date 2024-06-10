import mongoose,{} from "mongoose";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Like from "../models/likes.model.js";
import { returnError } from "../utils/error.js";

export const getFilteredProduct = async (userId)=>{
    try{
        let finalResp = await Product.aggregate( [ { $sample : { size : 40 } } ])
        if(userId){
            const user = await User.findById(userId)
            const userObjectId = user._id
            finalResp = await Product.aggregate([
                { $sample: { size: 40 } },
                {
                $lookup: {
                    from: 'likes', 
                    let: { productId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [{ $eq: ['$productId', '$$productId'] },{ $eq: ['$userId', userObjectId] }]
                                }
                            }
                        },
                        { $project: { _id: 0, like: 1, unlike: 1 } }
                    ],
                    as: 'userLikes'
                }
                },
                {
                    $addFields: {
                        like: { $arrayElemAt: ['$userLikes.like', 0] },
                        unlike: { $arrayElemAt: ['$userLikes.unlike', 0] }
                    }
                },
                {
                    $project: {
                        userLikes: 0 
                    }
                }
            ]);
        }
        if(!finalResp) throw returnError(500,'Problem fetching data')
        return finalResp
    }catch(err){
        throw err
    }
}

export const getProductByTag = async (tags)=>{
    try{
        const finalRes = await Product.find( { tags: { $in : tags } } ).limit(20)
        if(!finalRes) throw returnError(404,"no products with specified tags")
        return finalRes
    }catch(err){
        throw err
    }
}

export const searchProduct = async (query) => {
    try {
        const finalRes = await Product.find({
            name: { $regex: query, $options: "i" },
        }).limit(40);
        if(!finalRes) throw returnError(404,"no products with specified tags")
        return finalRes;
    } catch (err) {
        throw new Error(`Error in searchProduct`);
    }
};

export const checkProductExist = async (id)=>{
    try{
        const product = await Product.findById(id)
        if(!product) throw returnError(404,'product not found')
        else return product
    }catch(err){
        throw err;
    }
}