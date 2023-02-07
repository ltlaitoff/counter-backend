import Router from 'express'
import { routeContollers as colorController } from 'controllers/Color'

const colorRouter = Router()

colorRouter.get('/color/all', colorController.getAllColors)

export default colorRouter
