import Router from 'express'
import * as authorizationContoller from 'controllers/Authorization'
import { authorizationHeaderMiddleware } from 'middlewares/authorizationHeader.middleware'

const authorizationRouter = Router()

authorizationRouter.use('/authorization', authorizationHeaderMiddleware)

authorizationRouter.post('/authorization', authorizationContoller.authorization)

export default authorizationRouter
