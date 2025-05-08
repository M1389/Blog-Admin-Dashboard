import mongoose from "mongoose";
import User from "../Models/UserMd.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleERROR from "../Utils/handleError.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const login=catchAsync(async(req,res,next)=>{
    const {username=null,password=null,phoneNumber=null,role=null,...others}=req.body
    if(!username || !password){
        return next(new HandleERROR('username and password is  invalid',400))
    }
    const user =await User.findOne({username})
    if(!user){
        return next(new HandleERROR('invalid username or password' , 400))
    } 
    const checkPass = bcryptjs.compareSync(password,user.password)
    if(!checkPass){
        return next(new HandleERROR('invalid username or password',400))
    }
    const token =jwt.sign({id:user._id,role:user.role},process.env.SECRET_JWT)
    return res.status(200).json({
        message:'login successful',
        token:token,
        username: user?.username,
        success:true
    })
})
export const register=catchAsync(async(req,res,next)=>{
    const {username=null,password=null,phoneNumber=null,role=null,...others}=req.body
    if(!username || !password || !phoneNumber){
        return next(new HandleERROR('userName , Password and phoneNumber  are required',400))
    }
    const rejex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ )
    if(!rejex.test(password)){
        return next(new HandleERROR('Invalid password',400))
    }
    const hashPass =  bcryptjs.hashSync(password , 10)
    const user = await User.create({username,password:hashPass,phoneNumber,...others})
    return res.status(201).json({
        message:'user created successfully',
        success:true
    })
})