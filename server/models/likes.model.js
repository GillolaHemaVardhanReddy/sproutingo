import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // refers to the User model
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // refers to product model
        required: true,
    },
    like:{
        type: Boolean,
        required:true,
    },
    unlike:{
        type: Boolean,
        required:true,
    }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);

export default Like;