import Category from "../Models/CategoryMd.js";
import Comment from "../Models/CommentMd.js";
import Post from "../Models/PostMd.js";
import User from "../Models/UserMd.js";
import catchAsync from "../Utils/catchAsync.js";



const reportAll = catchAsync(async (req,res,next) => {
    const userCount = await User.countDocuments({})
    const categoriesCount = await Category.countDocuments({})
    const postsCount = await Post.countDocuments({})
    const commentsCount = await Comment.countDocuments({})
    res.status(200).json({
        success:true,
        report:{
            userCount,
            categoriesCount,
            postsCount,
            commentsCount
        },
        message:'get the report successfully'

    })
})

export default reportAll