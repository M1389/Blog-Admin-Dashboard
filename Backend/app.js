import express from "express";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import userRouter from "./Routes/User.js";
import authRouter from "./Routes/Auth.js";
import catchError from "./Utils/catchError.js";
import catchAsync from "./Utils/catchAsync.js";
import HandleERROR from "./Utils/handleError.js";
import categoryRouter from "./Routes/Category.js";
import commentRouter from "./Routes/Comment.js";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();
import cors from 'cors';
import uploadRouter from "./Routes/Upload.js";
import postRouter from "./Routes/Post.js";
import reportRouter from "./Routes/Report.js";


app.use(express.static('Public'))
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({  
    origin: 'http://localhost:5173',   
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true
}));
app.use('/api/users',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/categories',categoryRouter)
app.use('/api/comments',commentRouter   )
app.use('/api/posts', postRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/report',reportRouter)


app.use('*',catchAsync(async(req,res,next)=>{
    next(new HandleERROR('route not found',404))
}))
app.use(catchError)
export default app;
