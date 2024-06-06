import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connectToDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to db successfully')
    }catch(err){
        console.log('db connection error')
    }
}