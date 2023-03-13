import { Router } from 'express'
import * as ColorRoutes from './routes'

const colorRouter = Router()

colorRouter.get('/all', ColorRoutes.getAllColors)

export default colorRouter
