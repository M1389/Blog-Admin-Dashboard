import express from 'express'
import { create, getAll, getOne, update } from '../Controllers/PostCn.js'
import { isAdmin } from '../Middleware/isAdmin.js'
import { remove } from '../Controllers/UserCn.js'
const postRouter=express.Router()
postRouter.route('/').get(getAll).put(isAdmin,create)
postRouter.route('/:id').get(isAdmin,getOne).patch(isAdmin,update).delete(isAdmin,remove)

export default postRouter