import express from "express";
import { Authentication } from "../utils/authntication.js";
import { 
    createOrder,
    getTotalOrdersDelivered,
    getTotalOrdersNotDelivered,
    getNotDeliveredOrdersByDate,
    getDeliveredOrdersByDate,
    getDeliveredOrdersByProductName,
    getNotDeliveredOrdersByProductName,
    getDeliveredOrdersByUserId,
    getNotDeliveredOrdersByUserId,
    deleteOrder,
    getOrdersByOrderId,
    updateDetails
 }  
 from "./../controllers/orders.controllers.js"
const router = express.Router()

// create a order (authenticated and for user,admin)
router.post('/createorder',Authentication,createOrder)

//get totalordersdelivered till now (authenticated only for admin)
router.get('/all/delivered',Authentication,getTotalOrdersDelivered)

//get totalordersnotdelivered till now (authenticated only for admin) (yet to be delivered)
router.get('/all/notdelivered',Authentication,getTotalOrdersNotDelivered)

//get deliveredorders of loggid in users
router.get('/delivered',Authentication,getDeliveredOrdersByUserId)

//get notdeliveredorders of loggid in users
router.get('/notdelivered',Authentication,getNotDeliveredOrdersByUserId)

//delete order for both admin and user(authenticated)
router.delete('/:id',Authentication,deleteOrder);

//get order details by orderid for both admin and user(authenticated)
router.get('/:id',Authentication,getOrdersByOrderId);

//update order details by admin(authenticated)
router.put('/:id',Authentication,updateDetails);

// //get delivered orders by date(2024-01-01 datewise) (authenticated only for admin)
// router.get('/deliveredordersbydate',Authentication,getDeliveredOrdersByDate)

// //get not delevered orders by date (authenticated only for admin) (yet to be delivered)
// router.get('/notdeliveredordersbydate',Authentication,getNotDeliveredOrdersByDate)

// //getdeliveredorders by product name (authenticated only for admin)
// router.get('/deliveredordersbyproductname/:productName',Authentication,getDeliveredOrdersByProductName)

// //get not delivered orders by productname (authenticated only for admin) (yet to be delivered)
// router.get('/notdeliveredordersbyproductname/:productName',Authentication,getNotDeliveredOrdersByProductName)


// get orders by user in asc order according to date (authenticated to user)

// get all orders ascending order of dates for admin (authenticated for admin)

// delete order request only before 5hr for user

// delete order requests for admin from users

// 

export default router;