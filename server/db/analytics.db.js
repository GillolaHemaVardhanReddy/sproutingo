import ProductAnalytics from "../models/Productanalytics.model.js";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { returnError } from "../utils/error.js";
import Order from "../models/orders.model.js";

const findExistingRecordInProductAnalyticsAndSave = async (productId) => {
  try {

    const product = await Product.findById(productId)

    const existingRecord = await ProductAnalytics.findOne({productId });

    if (existingRecord) {
      return;
    }

    const newRecord = new ProductAnalytics({ productName: product.name,productId });
    await newRecord.save();

    console.log(`New record created for product with ID ${productId}`);
    return newRecord;
  } catch (error) {
    console.error('Error finding or saving record:', error);
    throw error; 
  }
};


export const increaseSearchCount = async (productsArray) => {
    try {
      for (const product of productsArray) {
        const productId = product._id;

        await findExistingRecordInProductAnalyticsAndSave(productId)

        await ProductAnalytics.updateOne(
          { productId },
          { $inc: { searchCount: 1 } }
        );
      }
      console.log('Search counts updated successfully');
    } catch (err) {
      console.error('Error updating search counts:', err.message);
    }
  };


  export const increaseUnlikeCount = async (productId) => {
    try {

      const record = await findExistingRecordInProductAnalyticsAndSave(productId);

      const updatedProduct = await ProductAnalytics.findOneAndUpdate(
        { productId },
        { $inc: { unlikesCount: 1 } },
        { new: true }
      );
  
      if (updatedProduct) {
        console.log(`Unlikes count incremented for product with ID ${productId}`);
        return;
      } else {
        throw returnError(404,`Product with ID ${productId} not found`);
      }
    } catch (error) {
      console.error('Error updating unlikes count:', error);
      throw error; 
    }
  };
  
  export const increaseLikeCount = async (productId)=>{
    try {
      console.log('entered like count')
        const record = await findExistingRecordInProductAnalyticsAndSave(productId);

        const updatedProduct = await ProductAnalytics.findOneAndUpdate(
          { productId },
          { $inc: { likesCount: 1 } },
          { new: true }
        );
    
        if (updatedProduct) {
          console.log(`Unlikes count incremented for product with ID ${productId}`);
          return;
        } else {
          throw returnError(404,`Product with ID ${productId} not found`);
        }
      } catch (error) {
        console.error('Error updating unlikes count:', error);
        throw error; 
      }
  }

  export const increaseViewCount = async (productId) => {
    try {

        const record = await findExistingRecordInProductAnalyticsAndSave(productId);

      const updatedProduct = await ProductAnalytics.findOneAndUpdate(
        { productId },
        { $inc: { viewCount: 1 } }, 
        { new: true } 
      );
  
      if (updatedProduct) {
        console.log(`View count incremented for product with ID ${productId}`);
        return;
      } else {
        throw new Error(`Product with ID ${productId} not found`);
      }
    } catch (error) {
      console.error('Error updating view count:', error);
      throw error;
    }
  };

  export const increaseOrderCount = async (orderId) => {
    try {
      const order = await Order.findById(orderId);
  
      if (!order) {
        throw new Error(`Order with ID ${orderId} not found`);
      }
  
      for (const item of order.products) {
        const productId = item.productId;
        const quantity = item.quantity;
  
        const record = await findExistingRecordInProductAnalyticsAndSave(productId);

        await ProductAnalytics.updateOne(
          { productId },
          { $inc: { orderCount: quantity } } 
        );
      }
  
      console.log(`Order count incremented for order with ID ${orderId}`);
    } catch (error) {
      console.error('Error updating order count:', error);
      throw error; 
    }
  };


  export const getProductsAnalyticsWithDetails = async () => {
    try {
      const analytics = await ProductAnalytics.find({}, 'productName likesCount unlikesCount')
        .populate({
          path: 'productId',
          select: 'discount price',
        });
      return analytics;
    } catch (error) {
      console.error('Error retrieving product analytics:', error);
      throw error;
    }
  };