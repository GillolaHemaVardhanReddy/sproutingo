import { checkProductExist, getFilteredProduct, getProductByTag, searchProduct } from "../db/product.db.js"
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
        console.error("Error create product controller");
        next(err)
    }
}

export const getProductById = async (req,res,next)=>{
    try{
        if (!mongoose.isValidObjectId(req.params.id)) return next( returnError(400,'Invalid product id'));
        const product = await checkProductExist(req.params.id)
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
        await checkProductExist(req.params.id)
        await Product.findOneAndDelete({_id:req.params.id})
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
        await checkProductExist(req.params.id)
        
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

        const product = await Product.findById(req.params.id)
        if(!product){
            return next(returnError(404,'product not found'))
        }
        
        const likedProduct = await Like.findOne({userId:req.user.id,productId:req.params.id})
        if(likedProduct){
            if(likedProduct.like){
                return res.status(200).json('already liked')
            }
            const updatedProduct = await Like.findByIdAndUpdate({_id:likedProduct._id},{
                $set: {like:true,unlike:false}
            },{new:true})
            res.status(200).json({success:true,data:updatedProduct})
        }else{
            const newLike = Like({userId:req.user.id,productId:req.params.id,like:true,unlike:false})
            await newLike.save() 
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

        const product = await Product.findById(req.params.id)
        if(!product){
            return next(returnError(404,'product not found'))
        }
        
        const likedProduct = await Like.findOne({userId:req.user.id,productId:req.params.id})
        if(likedProduct){
            if(likedProduct.unlike){
                return res.status(200).json('already unliked')
            }
            const updatedProduct = await Like.findByIdAndUpdate({_id:likedProduct._id},{
                $set: {like:false,unlike:true}
            },{new:true})
            res.status(200).json({success:true,data:updatedProduct})
        }else{
            const newLike = Like({userId:req.user.id,productId:req.params.id,like:false,unlike:true})
            await newLike.save()
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

export const random = async (req,res,next)=>{
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
    const tags = req.query.tags.split(",")
    try{
        const finalResp = await getProductByTag(tags);
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
    const query = req.query.q
    try{
        if(!query){
            return  res.json('no product found').status(200)
        }
        const finalResp = await searchProduct(query);
        res.status(200).json({
            success:true,
            data:finalResp
        })
    }catch(err){
        console.error("Error product search controller");
        next(err)
    }   
}