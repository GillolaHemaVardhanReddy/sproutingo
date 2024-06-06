import mongoose,{} from "mongoose";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Like from "../models/likes.model.js";

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
        return finalResp
    }catch(err){
        throw err
    }
}