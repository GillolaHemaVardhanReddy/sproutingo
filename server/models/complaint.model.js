import mongoose from "mongoose";
const complaintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    complaint: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250,
    },
    isResolved: {
        type: Boolean,
        default: false,
    }

},{timestamps: true})

const Complaint = mongoose.model("Complaint",complaintSchema);
export default Complaint;
