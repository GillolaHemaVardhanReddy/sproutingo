import express from "express";
import { Authentication } from "../utils/authntication";


const router = express.Router()

// get most liked products top 10 or any number pavan anna thinks 
router.get('/mostliked' , Authentication ,  )


// get least liked products only for admins
router.get('/leastliked', Authentication , )


// products which are most ordered
router.get('/mostordered', Authentication , )

// products which are least ordered
router.get('leaseordered', Authentication , )

// specific user ordered which product category the most

// specific user ordered which product category the lease

// 


export default router