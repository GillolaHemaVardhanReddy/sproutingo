import express from "express";
import {getAllUsers, getUserById, getUserDetails, deleteUserAccount, updateUser, getCartDetails} from '../controllers/user.controllers.js'
import { Authentication } from "../utils/authntication.js";

const router = express.Router()

// get all users (admin)
router.get('/all', Authentication, getAllUsers)

// get user cart (authenticated user)
router.get('/cart', Authentication, getCartDetails)

// get a user by id (admin)
router.get('/:id', Authentication, getUserById)

// get user details (authenticated user)
router.get('/', Authentication, getUserDetails)

// delete a user (authenticated user)
router.delete('/', Authentication, deleteUserAccount)

// update user profile (authenticated user)
router.put('/' , Authentication, updateUser)

// add to cart (authenticated user)
// router.put('/cart/:id', Authentication, addToCart)

// delete from cart (authenticated user)

//wishlist (authenticated user)


export default router