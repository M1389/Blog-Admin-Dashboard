import express from 'express'
import { update, getAll, getOne, create, getCommentsPost, remove } from '../Controllers/CommentCn.js'
import { isAdmin } from '../Middleware/isAdmin.js'
import { isLogin } from '../Middleware/isLogin.js'
const commentRouter=express.Router()
commentRouter.route('/').get(isAdmin,getAll).put(isLogin,create)
commentRouter.route('/post-comments/:id').get(getCommentsPost)
commentRouter.route('/:id').get(isAdmin,getOne).patch(isAdmin,update).delete(isAdmin,remove)

export default commentRouter