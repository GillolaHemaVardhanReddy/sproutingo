import express from "express";
import {getAllUsers, getUserById, getUserDetails, deleteUserAccount, updateUser, getCartDetails, addToCart, editCart, deleteCartProduct, getWishlist, userGlobalSearch} from '../controllers/user.controllers.js'
import { Authentication, filteredAuthentication } from "../utils/authntication.js";

const router = express.Router()

// get all users (admin)
router.get('/all', Authentication, getAllUsers)

// add to cart (authenticated user)
router.post('/cart', Authentication, addToCart)

// get user cart (authenticated user)
router.get('/cart', Authentication, getCartDetails)

// edit cart details (authenticated user)
router.put('/cart',Authentication,editCart)

// delete cart product (authenticated user only)
router.delete('/cart',Authentication,deleteCartProduct)

// get user details on search 
router.get('/search',filteredAuthentication,userGlobalSearch)

//wishlist (authenticated user)
router.get('/wishlist',Authentication,getWishlist)

// get a user by id (admin)
router.get('/:id', Authentication, getUserById)

// get user details (authenticated user)
router.get('/', Authentication, getUserDetails)

// delete a user (authenticated user)
router.delete('/', Authentication, deleteUserAccount)

// update user profile (authenticated user)
router.put('/' , Authentication, updateUser)



export default router