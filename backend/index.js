import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import pinRouter from './routers/pins.js'   
import userRouter from './routers/users.js'
dotenv.config()
const app=express()
app.use(express.json())
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
app.use("/api/pins",pinRouter)
app.use("/api/user",userRouter)
const PORT=8000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
