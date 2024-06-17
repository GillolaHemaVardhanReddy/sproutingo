import mongoose from 'mongoose';

const productsAnalyticsSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    unlikesCount: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    orderCount: {
      type: Number,
      default: 0,
    },
    searchCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ProductAnalytics = mongoose.model('ProductAnalytics', productsAnalyticsSchema);

export default ProductAnalytics;
