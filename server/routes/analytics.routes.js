import express from "express";
import { Authentication } from "../utils/authntication.js";
import { mostLikedProducts } from "../controllers/analytics.controllers.js";


const router = express.Router()

// get all data of product with likes and unlikes count
router.get('/products/mostliked' , Authentication , mostLikedProducts )


export default router