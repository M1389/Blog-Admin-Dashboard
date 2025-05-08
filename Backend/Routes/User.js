import express from 'express'
import { getAll, getOne, remove, update } from '../Controllers/UserCn.js'
import { isAdmin } from '../Middleware/isAdmin.js'
import { isLogin } from '../Middleware/isLogin.js'
const userRouter=express.Router()
userRouter.route('/').get(isAdmin,getAll)
userRouter.route('/:id').get(isLogin,getOne).patch(isAdmin,update).delete(isAdmin,remove)

export default userRouter