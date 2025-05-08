import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true,'title is required']
    },
    image:{
        type:String,
        default:''
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})


const Category=mongoose.model('Category',categorySchema)
export default Category