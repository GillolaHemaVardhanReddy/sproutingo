import { increaseLikeCount, increaseSearchCount, increaseUnlikeCount, increaseViewCount } from "../db/analytics.db.js"
import { checkProductExist, getFilteredProduct, getProductByTag, searchProduct, searchProductGlobal } from "../db/product.db.js"
import Like from "../models/likes.model.js"
import Product from "../models/product.model.js"
import { returnError } from "../utils/error.js"
import mongoose from "mongoose"

export const create = async (req,res,next)=>{
    if(req.role==='user') return next(returnError(401,'Unauthorized user'))
    try{
        const newProduct = Product(req.body)
        await newProduct.save()
        res.status(201).json({
            success: true,
            data:newProduct
        })
    }catch(err){
        console.error("Error create product controller:",err.message);
        next(err)
    }
}

export const getProductById = async (req,res,next)=>{
    try{
        if (!mongoose.isValidObjectId(req.params.id)) return next( returnError(400,'Invalid product id'));
        const product = await checkProductExist(req.params.id)

        await increaseViewCount(req.params.id)

        res.status(200).json({success:true,data:product})
    }catch(err){
        console.error("Error get product by id controller");
        next(err)
    }
}


export const deleteProduct = async (req,res,next)=>{
    if(req.role==='user') return next(returnError(401,'Unauthorized user'))
    try{
        if (!mongoose.isValidObjectId(req.params.id)) return next( returnError(400,'Invalid product id'));
        
        await checkProductExist(req.params.id,req.user.id)

        await Product.findOneAndUpdate(
            {_id:req.params.id},
            {$set : 
                {
                    isdeleted: true,
                    available: false,
                }
            },
        )
        res.status(200).json({success:true,data:'product successfully deleted'})
    }catch(err){
        console.error("Error delete product controller");
        next(err)
    }
}


export const update = async (req,res,next)=>{
    if(req.role==='user') return next(returnError(401,'Unauthorized user'))
    try{
        if (!mongoose.isValidObjectId(req.params.id)) return next( returnError(400,'Invalid product id'));
        await checkProductExist(req.params.id,req.user.id)
        
        const updatedProduct = await Product.findByIdAndUpdate({_id:req.params.id},{
            $set: req.body
        },{new:true})
        res.status(200).json({success:true,data:updatedProduct})
    }catch(err){
        console.error("Error update product controller");
        if (err instanceof mongoose.CastError) return next(returnError(400, 'enter valid details to update'));
        next(err)
    }
}

export const like = async (req,res,next)=>{
    try{
        if (!mongoose.isValidObjectId(req.params.id)){ 
            return next( returnError(400,'Invalid product id'));
        }

        await checkProductExist(req.params.id,req.user.id)

        const likedProduct = await Like.findOne({
            userId:req.user.id,
            productId:req.params.id
        })
        if(likedProduct){
            if(likedProduct.like){
                return res.status(200).json('already liked')
            }

            await increaseLikeCount(req.params.id)

            const updatedProduct = await Like.findByIdAndUpdate({_id:likedProduct._id},{
                $set: {like:true,unlike:false}
            },{new:true})

            const likeProduct = await Product.findByIdAndUpdate(req.params.id, {
                $inc: { unlikes: -1, likes: 1 }
            }, { new: true });

            res.status(200).json({success:true,data:updatedProduct})
        }else{
            const newLike = Like({userId:req.user.id,productId:req.params.id,like:true,unlike:false})
            await newLike.save() 
            await increaseLikeCount(req.params.id)
            return res.status(201).json({
                success:true,
                message:'liked successfully',
                data:newLike
            })
        }
    }catch(err){
        console.error("Error like product controller");
        next(err)
    }
}

export const dislike = async (req,res,next)=>{
    try{
        if (!mongoose.isValidObjectId(req.params.id)){ 
            return next( returnError(400,'Invalid product id'));
        }

        await checkProductExist(req.params.id,req.user.id)
        
        const likedProduct = await Like.findOne({userId:req.user.id,productId:req.params.id})
        if(likedProduct){
            if(likedProduct.unlike){
                return res.status(200).json('already unliked')
            }
            const updatedProduct = await Like.findByIdAndUpdate({_id:likedProduct._id},{
                $set: {like:false,unlike:true}
            },{new:true})
            const unlikeProduct = await Product.findByIdAndUpdate(req.params.id, {
                $inc: { unlikes: 1, likes: -1 }
            }, { new: true });

            await increaseUnlikeCount(req.params.id)

            res.status(200).json({success:true,data:updatedProduct})
        }else{
            const newLike = Like({userId:req.user.id,productId:req.params.id,like:false,unlike:true})
            await newLike.save()

            await increaseUnlikeCount(req.params.id)

            return res.status(201).json({
                success:true,
                message:'unliked successfully',
                data:newLike
            })
        }
    }catch(err){
        console.error("Error unlike product controller");
        next(err)
    }
}

export const getProductsAsc = async (req,res,next)=>{
    if(req.role==='user') return next(returnError(401,'Unauthorized user'))
    try{
        const resp = await Product.find().sort({price:1})
        return res.status(200).json({
            success:true,
            data:resp
        })
    }catch(err){
        next(err)
    }
}

export const clientProducts = async (req,res,next)=>{
    try{
        let finalList;
        if(req.user){
            finalList = await getFilteredProduct(req.user.id)
            return res.status(200).json({success:true,data:finalList})
        }else{
            finalList = await getFilteredProduct();
            return res.status(200).json({
                success:true,
                data:finalList
            });
        }
    }catch(err){
        console.error("Error get random products controller");
        next(err)
    }
}


export const getByTag = async (req,res,next)=>{
    try{
        const tags = req.query.tags.split(",")
        const finalResp = await getProductByTag(tags);
        await increaseSearchCount(finalResp);
        res.status(200).json({
            success:true,
            data:finalResp
        })
        
    }catch(err){    
        console.error("Error get by tag product controller");
        next(err)
    }
}

export const search = async (req,res,next)=>{
    try{
        const query = req.query.q
        if(!query){
            return  res.json('no product found').status(200)
        }
        const finalResp = await searchProduct(query);
        await increaseSearchCount(finalResp);
        res.status(200).json({
            success:true,
            data:finalResp
        })
    }catch(err){
        console.error("Error product search controller");
        next(err)
    }   
}

export const globalSearch = async (req,res,next)=>{
    const query = req.query.q
    try{
        if(!query){
            return  res.json('no product found').status(200)
        }
        const finalResp = await searchProductGlobal(query,req.role);
        await increaseSearchCount(finalResp);
        res.status(200).json({
            success:true,
            data:finalResp
        })
    }catch(err){
        next(err)
    }   
}

export const activateDelete = async (req,res,next)=>{
    if(req.role==='user') return next(returnError(401,'Unauthorized user'))
    try{
        if (!mongoose.isValidObjectId(req.params.id)) return next( returnError(400,'Invalid product id'));
        
        const product = await Product.findById(req.params.id)
        if(!product.isdeleted){
            return next(returnError(409,'Product is not deleted'))
        }
        
        await Product.findOneAndUpdate(
            {_id:req.params.id},
            {$set :{
                    isdeleted: false,
                    available: true
                }
            },
        )
        res.status(200).json({success:true,data:'product successfully recovered'})
    }catch(err){
        next(err)
    }   
}
