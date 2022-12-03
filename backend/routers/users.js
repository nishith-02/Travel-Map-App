import express from 'express'
import User from '../models/users.js'
import bcrypt from 'bcryptjs'
const userRouter=express.Router()


userRouter.post('/register',async(req,res)=>{
    try{
        const {username,password,email}=req.body
        const hashedPassword=await bcrypt.hash(password,8)
        const user=new User({
            username,
            password:hashedPassword,
            email
        })
        const createdUser=await user.save()
        res.status(201).json(createdUser._id)
    }
    catch(err){
        res.status(500).json(err)
    }
})

userRouter.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body
        const user=await User.findOne({username})
        if(!user){
            return res.status(400).json({message:"Wrong Username or Password"})
        }
        const validPassword=await bcrypt.compare(password,user.password)
        if(!validPassword){
            return res.status(400).json({message:"Wrong Username or Password"})
        }
        res.status(200).json({_id:user._id,username})
    }
    catch(error){
        res.status(500).json(error)
    }
})




export default userRouter
