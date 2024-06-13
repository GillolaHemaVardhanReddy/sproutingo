import express from "express";
import { activateDelete, clientProducts,
     create,
     deleteProduct, 
     dislike, 
     getByTag, 
     getProductById, 
     getProductsAsc, 
     globalSearch, 
     like, 
     search, 
     update
} from '../controllers/product.controllers.js'
import { Authentication, filteredAuthentication } from "../utils/authntication.js";

const router = express.Router()

// get products for clients
router.get('/all',filteredAuthentication,clientProducts)

// get products by tags
router.get('/tags',getByTag)

//get product from Global search matches all name/tags/desc/category
router.get('/search',filteredAuthentication,globalSearch)

// get products ascending order (only for admin)
router.get('/display',Authentication,getProductsAsc)

// get product by id (unuthenticated or authenticated)
router.get('/find/:id',getProductById)

// delete product by id (authenticated user is admin)
router.delete('/:id',Authentication,deleteProduct)

// update product by id (authenticated user is admin)
router.put('/:id',Authentication,update)

// liked product by id (authenticated user)
router.post('/like/:id',Authentication,like)

// unlike product by id (authenticated user)
router.post('/unlike/:id',Authentication,dislike)

// activate deleted products
router.get('/:id',Authentication,activateDelete)

// get products asc order of price products (unauthenticated or authenticated)
router.get('/',getProductsAsc)

// create a product (authenticated and only for admin)
router.post('/',Authentication,create)

export default router