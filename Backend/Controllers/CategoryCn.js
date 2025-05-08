import Category from "../Models/CategoryMd.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleERROR from "../Utils/handleError.js";
import ApiFeatures from "../Utils/apiFeatures.js";

export const create = catchAsync(async(req,res,next)=>{
    const category = await Category.create(req.body)
    return res.status(200).json({
        data:category,
        success:true,
        mesaage: 'category successfully created '
    })
})


export const getAll=catchAsync(async(req,res,next)=>{
    const features = new ApiFeatures(Category, req.query)
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
    
    const category = await Category.findById(id)
    return res.status(200).json({
        success:true,
        data:category
    })
})
    

export const update=catchAsync(async(req,res,next)=>{
    const {id} = req.params
    const {title=null , image=null , ...others} = req.body
    if(id!==req.userId && req.role!='admin'){
        return next(new HandleERROR('You dont have permission',401))
    }
    if(!title, !image){
        return next( new HandleERROR('Title and image are required',400))
    }
    const category = await Category.findByIdAndUpdate(id,req.body,{new:true, runValidators:true})
    return res.status(200).json({
        success:true,
        data:category,
        message:'update Category successfully'
    })
})
    

