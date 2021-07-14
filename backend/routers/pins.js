import express from 'express'
import Pin from '../models/Pin.js'
const pinRouter=express.Router()
pinRouter.post('/',async(req,res)=>{
    const newPin=new Pin(req.body)
    try{
        const savedPin=await newPin.save()
        res.status(201).json(savedPin)
    }
    catch(error){
        res.status(500).json(error)
    }
})

pinRouter.get('/',async(req,res)=>{
    try{
        const pins=await Pin.find({})
        res.status(200).json(pins)
    }
    catch(err){
        res.status(500).json(err)
    }
})

export default pinRouter