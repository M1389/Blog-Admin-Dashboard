import Post from "../Models/PostMd.js";
import User from "../Models/UserMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleERROR from "../Utils/handleError.js";
export const getAll=catchAsync(async(req,res,next)=>{
    const features = new ApiFeatures(User,req.query).filter().sort().paginate().limitFields().populate()
    const users = await features.query
    return res.status(200).json({
        message:'get all users successful',
        data: users
    })
})

export const getOne=catchAsync(async(req,res,next)=>{
    const {id} = req.params
    if(id!==req.userId && req.role!='admin'){
        return next(new HandleERROR('You dont have permission',401))
    }
    const user = await User.findById(id).select('-password')
    return res.status(200).json({
        success:true,
        data:user
    })
})
    

export const update=catchAsync(async(req,res,next)=>{
    const {id} = req.params
    if(id!==req.userId && req.role!='admin'){
        return next(new HandleERROR('You dont have permission',401))
    }
    
    const {role=null,password=null,...others}= req.body
    const updateUserBody = role && req.role=='admin'?{role,...others}:others
    const user = await User.findByIdAndUpdate(id,updateUserBody,{new:true, runValidators:true})
    return res.status(200).json({
        success:true,
        data:user,
        message:'update Account successfully'
    })
})
    

export const remove=catchAsync(async(req,res,next)=>{
    const {id} = req.params
    if(id!==req.userId && req.role!='admin'){
        return next(new HandleERROR('You dont have permission',401))
    }
    
    await Post.findByIdAndDelete(id)
    return res.status(200).json({
        success:true,
        message:'Delete Account successfully'
    })
})
