import express from "express"
import { createComplaint, deleteComplaint, displayComplaints, updateComplaint } from "../controllers/complaint.controllers.js";


import { Authentication } from "../utils/authntication.js";
const router = express.Router();



//for testing purpose post a complaint into db
router.post('/create',Authentication,createComplaint);

//delete complaint by admin, if that complaint is resolved or no longer is required
router.delete('/:id',Authentication,deleteComplaint);
//global search complaint 
router.put('/:id',Authentication,updateComplaint);

//displaying complaints
router.get('/',Authentication,displayComplaints)


export default router