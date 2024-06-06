import express from "express";
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const port = process.env.PORT || 8800
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
}) 