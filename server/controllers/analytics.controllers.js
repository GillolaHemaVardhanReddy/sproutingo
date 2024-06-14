import { getProductsAnalyticsWithDetails } from "../db/analytics.db.js";
import { returnError } from "../utils/error.js";
import chalk from "chalk"

export const mostLikedProducts = async (req, res, next) => {
  if(req.role==='user') return next(returnError(409,'Only admins are allowed'))
  try {
    console.log(chalk.blue.bgWhite('entered into mostLikedProducts controller'))
    const mostLikedProducts = await getProductsAnalyticsWithDetails()

    console.log(chalk.green.bgWhite('retrived liked analytics and sent response'))

    res.status(200).json({ success: true, data: mostLikedProducts });
  } catch (err) {
    console.log(chalk.red.bgWhite('error in mostLikedProducts analytics controller: ',err.message))
    next(err);
  }
};