import { Router } from 'express'
import authorizationRouter from './authorization'
import debugRouter from './debug'
import initializeRouter from './initialize'
import statisticRouter from './statistic'

const rootRouter = Router()

rootRouter.use(authorizationRouter)
rootRouter.use(initializeRouter)
rootRouter.use(statisticRouter)
rootRouter.use('/', debugRouter)

export default rootRouter
