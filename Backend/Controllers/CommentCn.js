import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import Comment from "../Models/CommentMd.js";
export const create=catchAsync(async (req,res,next) => {
    const comment=await Comment.create({...req.body,userId:req.userId})
    return res.status(201).json({
        data: comment,
        success: true,
        message:'create Comment successfully'

      });
})
export const getAll = catchAsync(async (req, res, next) => {
  const queryString={...req.query}
  const features = new ApiFeatures(Comment,queryString)
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .populate();
  const comment = await features.query;
  return res.status(200).json({
    data: comment,
    success: true,
  });
});
export const getOne = catchAsync(async (req, res, next) => {
    const {id}=req.params
    const comment=await Comment.findById(id)
    return res.status(200).json({
        success:true,
        data:comment
    })
});
export const update = catchAsync(async (req, res, next) => {
    const {id}=req.params
    const post=await Comment.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    return res.status(200).json({
        success:true,
        data:post,
        message:'update comment successfully'

    })
});

export const getCommentsPost = catchAsync(async(req,res,next)=>{
    const {id} = req.params
    const comments = await Comment.find({
        $and: [{isActive: true},{postId: id}],
    })
    return res.status(200).json({
        message:'get comment post successfully',
        data: comments,
        success: true
    })
})


export const remove = catchAsync(async (req, res, next) => {
    const {id}=req.params
    await Comment.findByIdAndDelete(id)
    return res.status(200).json({
        success:true,
        message:'remove comment successfully'

    })
});