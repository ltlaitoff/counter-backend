import { Router } from 'express'
import * as AuthorizationRoutes from './routes'
import { authorizationHeaderMiddleware } from '../middlewares/authorizationHeader.middleware'

const authorizationRouter = Router()

authorizationRouter.use('', authorizationHeaderMiddleware)

authorizationRouter.post('', AuthorizationRoutes.authorization)

export default authorizationRouter
