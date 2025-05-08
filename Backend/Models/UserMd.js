import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'username is required'],
        unique:[true, 'username is already taken']
    },
    password:{
        type:String,
        required: [true, 'password is required'],
    },
    profileImage:{
        type: String,
        default:''
    },
    role:{
        type: String,
        enum:['user', 'admin'],
        default:'user'
    },
    phoneNumber:{
        type: String,
        required:[true , 'phoneNumber is required'],
        unique:[true , 'phoneNumber is required'],
        
    },requiredemail:{
        type: String,
        
    }
},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User