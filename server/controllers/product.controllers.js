import { increaseLikeCount, increaseSearchCount, increaseUnlikeCount, increaseViewCount } from "../db/analytics.db.js"
import { checkProductExist, getFilteredProduct, getProductByTag, searchProduct, searchProductGlobal } from "../db/product.db.js"
import Like from "../models/likes.model.js"
import Product from "../models/product.model.js"
import { returnError } from "../utils/error.js"
import mongoose from "mongoose"
import chalk from "chalk"

export const create = async (req,res,next)=>{
    if(req.role==='user') return next(returnError(401,'Unauthorized user'))
    try{
        console.log(chalk.blue.bgWhite('entered into create product controller'))
        const newProduct = Product(req.body)
        await newProduct.save()

        console.log(chalk.green.bgWhite('created product and sent response'))
        res.status(201).json({
            success: true,
            data:newProduct
        })
    }catch(err){
        console.log(chalk.red.bgWhite('error in create product controller: ',err.message))
        next(err)
    }
}

export const getProductById = async (req,res,next)=>{
    try{
        console.log(chalk.blue.bgWhite('entered into getProductById controller'))
        if (!mongoose.isValidObjectId(req.params.id)) return next( returnError(400,'Invalid product id'));
        const product = await checkProductExist(req.params.id)

        await increaseViewCount(req.params.id)

        console.log(chalk.green.bgWhite('got product by id and sent response'))
        res.status(200).json({success:true,data:product})
    }catch(err){
        console.log(chalk.red.bgWhite('error in getProductById controller: ',err.message))
        next(err)
    }
}


export const deleteProduct = async (req,res,next)=>{
    if(req.role==='user') return next(returnError(401,'Unauthorized user'))
    try{
        console.log(chalk.blue.bgWhite('entered into deleteProduct controller'))

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

        console.log(chalk.green.bgWhite('deleted product and sent response'))

        res.status(200).json({success:true,data:'product successfully deleted'})
    }catch(err){
        console.log(chalk.red.bgWhite('error in deleteProduct controller: ',err.message))
        next(err)
    }
}


export const update = async (req,res,next)=>{
    if(req.role==='user') return next(returnError(401,'Unauthorized user'))
    try{
        console.log(chalk.blue.bgWhite('entered into update product controller'))
        if (!mongoose.isValidObjectId(req.params.id)) return next( returnError(400,'Invalid product id'));
        await checkProductExist(req.params.id,req.user.id)
        
        const updatedProduct = await Product.findByIdAndUpdate({_id:req.params.id},{
            $set: req.body
        },{new:true})

        console.log(chalk.green.bgWhite('updated product and sent response'))
        res.status(200).json({success:true,data:updatedProduct})
    }catch(err){
        console.log(chalk.red.bgWhite('error in update product controller: ',err.message))
        if (err instanceof mongoose.CastError) return next(returnError(400, 'enter valid details to update'));
        next(err)
    }
}

export const like = async (req,res,next)=>{
    try{
        console.log(chalk.blue.bgWhite('entered into like controller'))
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

            console.log(chalk.green.bgWhite('liked product and sent response'))

            res.status(200).json({success:true,data:updatedProduct})
        }else{
            const newLike = Like({userId:req.user.id,productId:req.params.id,like:true,unlike:false})
            await newLike.save() 
            await increaseLikeCount(req.params.id)

            console.log(chalk.green.bgWhite('liked product created and sent response'))
            return res.status(201).json({
                success:true,
                message:'liked successfully',
                data:newLike
            })
        }
    }catch(err){
        console.log(chalk.red.bgWhite('error in like controller: ',err.message))
        next(err)
    }
}

export const dislike = async (req,res,next)=>{
    try{
        console.log(chalk.blue.bgWhite('entered into dislike controller'))
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

            console.log(chalk.green.bgWhite('unliked product and sent response'))
            res.status(200).json({success:true,data:updatedProduct})
        }else{
            const newLike = Like({userId:req.user.id,productId:req.params.id,like:false,unlike:true})
            await newLike.save()

            await increaseUnlikeCount(req.params.id)

            console.log(chalk.green.bgWhite('unliked product created and sent response'))

            return res.status(201).json({
                success:true,
                message:'unliked successfully',
                data:newLike
            })
        }
    }catch(err){
        console.log(chalk.red.bgWhite('error in dislike controller: ',err.message))
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
        console.log(chalk.blue.bgWhite('entered into clientProducts controller'))
        let finalList;
        if(req.user){
            finalList = await getFilteredProduct(req.user.id)

            console.log(chalk.green.bgWhite('retrived user products and sent response'))
            return res.status(200).json({success:true,data:finalList})
        }else{
            finalList = await getFilteredProduct();

            console.log(chalk.green.bgWhite('retrived unauth products and sent response'))
            return res.status(200).json({
                success:true,
                data:finalList
            });
        }
    }catch(err){
        console.log(chalk.red.bgWhite('error in clientProducts controller: ',err.message))
        next(err)
    }
}


export const getByTag = async (req,res,next)=>{
    try{
        console.log(chalk.blue.bgWhite('entered into getByTag controller'))
        const tags = req.query.tags.split(",")
        const finalResp = await getProductByTag(tags);
        await increaseSearchCount(finalResp);

        console.log(chalk.green.bgWhite('retrived products by id and sent response'))
        res.status(200).json({
            success:true,
            data:finalResp
        })
        
    }catch(err){    
        console.log(chalk.red.bgWhite('error in getByTag controller: ',err.message))
        next(err)
    }
}

export const search = async (req,res,next)=>{
    try{
        console.log(chalk.blue.bgWhite('entered into search controller'))
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
        console.log(chalk.red.bgWhite('error in product search controller: ',err.message))
        next(err)
    }   
}

export const globalSearch = async (req,res,next)=>{
    const query = req.query.q
    try{
        console.log(chalk.blue.bgWhite('entered into globalSearch controller'))
        if(!query){
            return  res.json('no product found').status(200)
        }
        const finalResp = await searchProductGlobal(query,req.role);
        await increaseSearchCount(finalResp);

        console.log(chalk.green.bgWhite('retrived products by search term globally and sent response'))
        res.status(200).json({
            success:true,
            data:finalResp
        })
    }catch(err){
        console.log(chalk.red.bgWhite('error in globalSearch controller: ',err.message))
        next(err)
    }   
}

export const activateDelete = async (req,res,next)=>{
    if(req.role==='user') return next(returnError(401,'Unauthorized user'))
    try{

        console.log(chalk.blue.bgWhite('entered into activateDelete controller'))
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

        console.log(chalk.green.bgWhite('activated deleted product and sent response'))
        res.status(200).json({success:true,data:'product successfully recovered'})
    }catch(err){
        console.log(chalk.red.bgWhite('error in activateDelete controller: ',err.message))
        next(err)
    }   
}
