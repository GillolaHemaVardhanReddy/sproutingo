import mongoose,{} from "mongoose";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Like from "../models/likes.model.js";
import { returnError } from "../utils/error.js";

export const getFilteredProduct = async (userId)=>{
    try{
        let finalResp = await Product.aggregate( [ {
             $match: { 
                isdeleted:false,available:true 
            }
        } ])
        if(userId){
            const user = await User.findById(userId)
            const userObjectId = user._id
            finalResp = await Product.aggregate([
                { $match: { isdeleted:false,available:true } },
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
        const finalRes = await Product.find( 
            {$and : [
                { tags: { $in : tags } } ,
                { isdeleted: false } 
            ]}
        )
        if(!finalRes.length) throw returnError(404,"no products with specified tags")
        return finalRes
    }catch(err){
        throw err
    }
}

export const searchProduct = async (query) => {
    try {
        const finalRes = await Product.find({
            $and: [
                { name: { $regex: query, $options: "i" } },
                { isDeleted: false }
            ]
        })

        if (!finalRes.length) {
            throw returnError(404, "No products found matching the search query");
        }

        return {
            success: true,
            data: finalRes
        };
    } catch (err) {
        throw err;
    }
};

export const checkProductExist = async (id)=>{
    try{
        const product = await Product.findById(id)

        if(!product) throw returnError(404,'product not found')

        if(product.isdeleted) throw returnError(409,"product is not avilable")
        
        if(!product.available) throw returnError(409,"product is not available")
     
        else return product
    }catch(err){
        throw err;
    }
}

export const searchProductGlobal = async (query) => {
    try {
        const finalRes = await Product.find({
            $and: [
                {isdeleted: false},
                {available: true},
                {
                    $or: [
                        { name: { $regex: query, $options: "i" } },
                        { tags: { $elemMatch: { $regex: query, $options: "i" } } },
                        { desc: { $regex: query, $options: "i" } },
                        { category: { $regex: query, $options: "i" } },
                    ]
                }
            ]
        })

        if (!finalRes.length) {
            throw returnError(404,"No products found");
        }

        return finalRes;
    } catch (err) {
        throw err
    }
};
