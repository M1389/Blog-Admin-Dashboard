import mongoose, { model } from "mongoose";
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required'],
        unique:[true, 'title must be unique']
    },
    image:{
        type:[String],
        default:[]
    },
    description:{
        type:String,
        required:[true,'description is required']
        
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        default:[]
    }
    


},{timestamps:true})


const Post = mongoose.model('Post', postSchema)
export default Post