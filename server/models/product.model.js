import mongoose from "mongoose";

const urlValidator = (value) => {
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    return value.every(url => urlRegex.test(url));
};

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    dis_price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    thumb_img: {
        type: String,
        // required: true,
    },
    imgUrls: {
        type: [String],
        validate: {
            validator: urlValidator,
            message: props => `${props.value} contains an invalid URL!`
        },
    },
    desc: {
        type: String,
        required: true,
        minlength: 60,
        maxlength: 150,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    likes:{
        type: Number,
        default: 0
    },
    dislikes:{
        type: Number,
        default: 0
    },
    mixed_products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product', // refers to this model itself
        required: true,
    },
},{timestamps:true});

productSchema.pre('save',(next)=>{
    next()
})

const Product = mongoose.model('Product', productSchema);

export default Product;
