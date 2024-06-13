import mongoose from "mongoose";
const itemsSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // refers to product model
        required: true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
    },
    price:{
        type:Number,
        required: true,
    }
}
);
//orderid
const ordersSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // refers to the User model
        required: true,
    },
    products : {
        type: [itemsSchema],
        required: true,
    },
    orderedDate:{
        type:Date,
        required:true,
        default: Date.now
    },
    deliveredDate :{
        type:Date,
        required:true,
        default: Date.now
    },
    isDelivered:{
        type:Boolean,
        default:false,
    },

    reqDelete:{
        type:Boolean,
        default:false,
    },
    msg:{
        type:String,
        default:"Will be delivered soon",
    },
    deliveryAddress:{
        type:String,
        // required:true
    },
    deliveryNumber:{
        type:Number,
        // required:true,
    },
    ispaid:{
        type:Boolean,
        default:false,
    },
    isdelete:{
        type: Boolean,
        default: false
    }
})

const Order = mongoose.model("Order",ordersSchema);
export default Order;