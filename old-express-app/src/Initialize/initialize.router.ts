import Router from 'express'
import * as InitializeRoutes from './routes'

const initializeRouter = Router()

initializeRouter.get('', InitializeRoutes.initialize)

export default initializeRouter
