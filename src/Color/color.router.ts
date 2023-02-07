import Router from 'express'
import * as ColorRoutes from './routes'

const colorRouter = Router()

colorRouter.get('/color/all', ColorRoutes.getAllColors)

export default colorRouter
