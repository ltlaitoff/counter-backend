import { Router } from 'express'
import authorizationRouter from './authorization'
import debugRouter from './debug'

const rootRouter = Router()

rootRouter.use(authorizationRouter)
rootRouter.use('/', debugRouter)

export default rootRouter
