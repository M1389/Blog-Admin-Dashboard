import express from 'express'
import { isAdmin } from '../Middleware/isAdmin.js'
import reportAll from '../Controllers/ReportCn.js'
const reportRouter = express.Router()
reportRouter.route('/').get(isAdmin, reportAll)

export default reportRouter