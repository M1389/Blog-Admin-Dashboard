import Post from "../Models/PostMd.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleERROR from "../Utils/handleError.js";
import ApiFeatures from "../Utils/apiFeatures.js";

export const create = catchAsync(async(req,res,next)=>{
    const post = await Post.create(req.body)
    return res.status(200).json({
        data:post,
        success:true,
        mesaage: 'post successfully created '
    })
})


export const getAll=catchAsync(async(req,res,next)=>{
    const features = new ApiFeatures(Post, req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .populate();
    
    const categories = await features.query;
    
    return res.status(200).json({
        success:true,
        data:categories
    })

})


export const getOne=catchAsync(async(req,res,next)=>{
    const {id} = req.params
    
    const post = await Post.findById(id)
    return res.status(200).json({
        success:true,
        data:post
    })
})
    

export const update=catchAsync(async(req,res,next)=>{
    const {id} = req.params
    if(id!==req.userId && req.role!='admin'){
        return next(new HandleERROR('You dont have permission',401))
    }
    const post = await Post.findByIdAndUpdate(id,req.body,{new:true, runValidators:true})
    return res.status(200).json({
        success:true,
        data:post,
        message:'update Post successfully'
    })
})

export const remove=catchAsync(async(req,res,next)=>{
    const {id} = req.params
    if(id!==req.userId && req.role!='admin'){
        return next(new HandleERROR('You dont have permission',401))
    }
    const post = await Post.findByIdAndDelete(id)
    return res.status(200).json({
        success:true,
        data:post,
        message:'remove Post successfully'
    })
})
    

