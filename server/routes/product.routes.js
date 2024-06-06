import express from "express";
import { create, deleteProduct, dislike, getByTag, getProductById, like, random, search, update } from '../controllers/product.controllers.js'
import { Authentication, filterProducts } from "../utils/authntication.js";

const router = express.Router()
 
// create a product (authenticated and only for admin)
router.post('/',Authentication,create)

// get product by id (unuthenticated or authenticated)
router.get('/:id',getProductById)

// delete product by id (authenticated user is admin)
router.delete('/:id',Authentication,deleteProduct)

// update product by id (authenticated user is admin)
router.put('/:id',Authentication,update)

// liked product by id (authenticated user)
router.post('/like/:id',Authentication,like)

// unlike product by id (authenticated user)
router.post('/unlike/:id',Authentication,dislike)

// get random products (unauthenticated or authenticated)
router.get('/',filterProducts,random)

// get products by tags
router.get('/tags',getByTag)

//get product from search
router.get('/search',search)

export default router