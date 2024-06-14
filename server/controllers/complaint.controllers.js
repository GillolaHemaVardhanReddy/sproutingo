import mongoose from "mongoose"
import { returnError } from "../utils/error.js"
import Complaint from "../models/complaint.model.js"
import User from "../models/user.model.js";

//complaint will be created by user in frontend like from form text is taken 
export const createComplaint = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const newComplaint = Complaint({userId,...req.body});
        await newComplaint.save()
        res.status(201).json({
            success: true,
            data: newComplaint
        })
    } catch (err) {
        console.error("Error taking complaint: ", err.message);
        next(err);
    }
}


export const deleteComplaint = async (req,res,next) =>{
    if(req.role==='user') return next(returnError(401,'Unauthorized user'));
    try{
        const cid = req.params.id;
        if (!mongoose.isValidObjectId(req.params.id)) return next( returnError(400,'Invalid complaint id'));
        const delcomplaint = await Complaint.find({userId: cid});
        if(!delcomplaint) return next(returnError(404, 'Complaint doesnot exist'));
        const response = await Complaint.findOneAndDelete({ _id: cid });

        res.status(200).json({success:true,data:'complaint deleted successfully'});
        
    } catch(err){
        next(err);
    }
}


//global search 



const searchComplaintGlobal = async (query, role) => {
    try {
        // Define search criteria for the User collection
        const userSearchCriteria = {
            $or: [
                { "address.street": { $regex: query, $options: "i" } },
                { $expr: {
                    $regexMatch:{
                        input: {$toString: "$phone"},
                        regex:  query,
                        options: "i" 
                    }
                }},
                { name: { $regex: query, $options: "i" } }
            ]
        };
        
        // Find matching users and extract their IDs
        const users = await User.find(userSearchCriteria).select('_id');
        const userIds = users.map(user => user._id);

        // Define search criteria for the Complaint collection
        const complaintSearchCriteria = {
            $or: [
                { name: { $regex: query, $options: "i" } },
                { complaint: { $regex: query, $options: "i" } },
                { address: { $regex: query, $options: "i" } },
                { phone: { $regex: query, $options: "i" } },
                { userId: { $in: userIds } }
            ]
        };

        // Perform the search and populate user information
        const finalRes = await Complaint.find(complaintSearchCriteria).populate('userId', 'address.street phone name');

        // Check if results are found
        if (!finalRes.length) {
            throw returnError(404, "No Complaints found");
        }

        return finalRes;
    } catch (err) {
        // Re-throw the error for the calling function to handle
        throw err;
    }
};


export const getComplaint = async(req,res,next ) => {
    if(req.role==='user') return next(returnError(401,'Unauthorized user'));
    const query = req.query.q;
    if(query.length<2) return next(returnError(404,'enter more than 2 charecters to search'))
    try{
        if(!query){
            return  res.json('no complaint found').status(200)
        }
        const finalResp = await searchComplaintGlobal(query,req.role);
        res.status(200).json({
            success:true,
            data:finalResp
        })
    } catch(err) {
        next(err);
    }
}

//if resolved or not
export const updateComplaint = async(req,res,next) => {
    if (req.role === 'user') return next(returnError(401, 'Unauthorized user'));
    try{
        if (!mongoose.isValidObjectId(req.params.id))
            return next(returnError(400, 'Invalid complaint id'));
       else{
            const cid = req.params.id;
            const c = await Complaint.findOne({_id: cid });
            c.isResolved = !c.isResolved

            await c.save();
            return res.status(200).json({ message: 'Complaint updated', c });
       }
    } catch(err) {
        next(err);
    }
}



export const displayComplaints = async(req,res,next) => {
    if (req.role === 'user') return next(returnError(401, 'Unauthorized user'))
        try {
            const complaints = await Complaint.find().populate("userId","name address.street phone")
            res.status(200).json({success:true,data:complaints})
        } catch (err) {
            console.error("Error in geting all complaints controller");
            next(err)
        }
}

