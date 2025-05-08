import express from 'express'
import { create, getAll, getOne, update } from '../Controllers/CategoryCn.js'
import { isAdmin } from '../Middleware/isAdmin.js'
const categoryRouter=express.Router()
categoryRouter.route('/').get(getAll).put(isAdmin,create)
categoryRouter.route('/:id').get(getOne).patch(isAdmin,update).get(isAdmin,getOne)

export default categoryRouter