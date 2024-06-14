import mongoose from "mongoose"
import { returnError } from "../utils/error.js"
import Complaint from "../models/complaint.model.js"

//complaint will be created by user in frontend like from form text is taken 
export const create = async (req, res, next) => {
    try {
        const newComplaint = Complaint(req.body);
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



export const searchComplaintGlobal = async (query, role) => {
    try {
        // Define the base query with the search criteria
        const searchCriteria = {
            $or: [
                { name: { $regex: query, $options: "i" } },
                { complaint: { $regex: query, $options: "i" } },
                { address: { $regex: query, $options: "i" } },
                { phone: { $regex: query, $options: "i" } },
            ]
        };
        const finalRes = await Complaint.find(searchCriteria);
        if (!finalRes.length) {
            throw returnError(404, "No COmplaints found");
        }
        return finalRes;
    } catch (err) {
        throw err;
    }
}

export const getComplaint = async(req,res,next ) => {
    const query = req.query.q;
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
        if (!mongoose.isValidObjectId(req.body.id))
            return next(returnError(400, 'Invalid complaint id'));
        else{
            const cid = req.params.id;
            const complaint = await Complaint.findOne({ cid });
            complaint.isResolved = !complaint.isResolved;
            await complaint.save();
            return res.status(200).json({ message: 'Complaint updated', complaint });
        }
    } catch(err) {
        next(err);
    }
}

