import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { returnError } from "../utils/error.js";

// validation methods
function pincodeValidate(v) {
    return /^\d{6}$/.test(v);
}

function phoneValidate(v) {
    return /^\d{10}$/.test(v);
}

// address schema
const addressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    house_no: {
        type: String,
    },
    address_type: {
        type: String,
        default: "home",
    },
    pincode: {
        type: String,
        required: true,
        validate: {
            validator: pincodeValidate,
            message: props => `${props.value} is not a valid 6 digit pincode!`
        }
    },
    state: {
        type: String,
        default: "Telangana",
    },
    country: {
        type: String,
        default: "India",
    },
});


// crat schema
const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // refers to Product model
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
});


// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    cart: {
        type: [cartSchema],
        default: [],
    },
    phone: {
        type: Number,
        unique: true,
        validate: {
            validator: phoneValidate,
            message: props => `${props.value} is not a valid 10 digit phone number!`
        },
    },
    address:{
        type: [addressSchema],
        default: [],
    },
    wishlist: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product', // refers to Product model
        default: [],
    },
    liked_products:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product', // refers to product model
        default: [],
    },
    disliked_products:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product', // refers to product model
        default: [],
    },
},{timestamps:true});



userSchema.pre('save', async function(next){
    console.log('entered mongoose middleware to encrypt password',this.password)
    try{
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password,salt);
        console.log('password hashed is: ',this.password)
        next()
    }catch(err){
        console.log('error encrypting password')
        next(returnError())
    }
});


const User = mongoose.model('User', userSchema);

export default User;