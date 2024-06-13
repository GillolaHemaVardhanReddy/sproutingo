import { getProductsAnalyticsWithDetails } from "../db/analytics.db.js";
import { returnError } from "../utils/error.js";

export const mostLikedProducts = async (req, res, next) => {
  if(req.role==='user') return next(returnError(409,'Only admins are allowed'))
  try {
    const mostLikedProducts = await getProductsAnalyticsWithDetails()
    res.status(200).json({ success: true, data: mostLikedProducts });
  } catch (err) {
    next(err);
  }
};