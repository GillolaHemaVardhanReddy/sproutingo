import mongoose from "mongoose"
import { returnError } from "../utils/error.js"
import Complaint from "../models/complaint.model.js"
import User from "../models/user.model.js";
import chalk from "chalk"

//complaint will be created by user in frontend like from form text is taken 
export const createComplaint = async (req, res, next) => {
    try {
        console.log(chalk.blue.bgWhite('entered into createComplaint controller'))
        const userId = req.user.id;
        const newComplaint = Complaint({userId,...req.body});
        await newComplaint.save()

        console.log(chalk.green.bgWhite('successfully created complaint and sent response'))
        res.status(201).json({
            success: true,
            data: newComplaint
        })
    } catch (err) {
        console.log(chalk.red.bgWhite('error in createComplaint controller: ',err.message))
        next(err);
    }
}


export const deleteComplaint = async (req,res,next) =>{
    if(req.role==='user') return next(returnError(401,'Unauthorized user'));
    try{
        console.log(chalk.blue.bgWhite('entered into deleteComplaint controller'))
        const cid = req.params.id;
        if (!mongoose.isValidObjectId(req.params.id)) return next( returnError(400,'Invalid complaint id'));
        const delcomplaint = await Complaint.find({userId: cid});
        if(!delcomplaint) return next(returnError(404, 'Complaint doesnot exist'));
        await Complaint.findOneAndDelete({ _id: cid });

        console.log(chalk.green.bgWhite('complaint deleted successfully and sent response'))
        res.status(200).json({success:true,data:'complaint deleted successfully'});
        
    } catch(err){
        console.log(chalk.red.bgWhite('error in deleteComplaint controller: ',err.message))
        next(err);
    }
}


//global search 



const searchComplaintGlobal = async (query, role) => {
    try {
        console.log(chalk.blue.bgWhite('entered into searchComplaintGlobal controller'))
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
        
        const users = await User.find(userSearchCriteria).select('_id');
        const userIds = users.map(user => user._id);

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
        console.log(chalk.blue.bgWhite('entered into getComplaint controller'))
        if(!query){
            return  res.json('no complaint found').status(200)
        }
        const finalResp = await searchComplaintGlobal(query,req.role);

        console.log(chalk.green.bgWhite('search complaint retrived successfully and sent response'))
        res.status(200).json({
            success:true,
            data:finalResp
        })
    } catch(err) {
        console.log(chalk.red.bgWhite('error in getComplaint controller: ',err.message))
        next(err);
    }
}

//if resolved or not
export const updateComplaint = async(req,res,next) => {
    if (req.role === 'user') return next(returnError(401, 'Unauthorized user'));
    try{
        console.log(chalk.blue.bgWhite('entered into updateComplaint controller'))
        if (!mongoose.isValidObjectId(req.params.id))
            return next(returnError(400, 'Invalid complaint id'));
       else{
            const cid = req.params.id;
            const c = await Complaint.findOne({_id: cid });
            c.isResolved = !c.isResolved

            await c.save();

            console.log(chalk.green.bgWhite('updated complaint successfully and sent response'))
            return res.status(200).json({ message: 'Complaint updated', c });
       }
    } catch(err) {
        console.log(chalk.red.bgWhite('error in updateComplaint controller: ',err.message))
        next(err);
    }
}



export const displayComplaints = async(req,res,next) => {
    if (req.role === 'user') return next(returnError(401, 'Unauthorized user'))
        try {
            console.log(chalk.blue.bgWhite('entered into displayComplaints controller'))
            const complaints = await Complaint.find().populate("userId","name address.street phone")

            console.log(chalk.green.bgWhite('all complaints retrived successfully and sent response'))
            res.status(200).json({success:true,data:complaints})
        } catch (err) {
            console.log(chalk.red.bgWhite('error in displayComplaints controller: ',err.message))
            next(err)
        }
}

