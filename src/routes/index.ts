import { Router } from 'express'
import authorizationRouter from './authorization'
import debugRouter from './debug'
import initializeRouter from './initialize'
import statisticRouter from './statistic'
import categoryRouter from './category'

import { ColorRouter } from 'Color'

const rootRouter = Router()

rootRouter.use(authorizationRouter)
rootRouter.use(initializeRouter)
rootRouter.use(statisticRouter)
rootRouter.use(categoryRouter)
rootRouter.use(ColorRouter.path, ColorRouter.router)
rootRouter.use('/', debugRouter)

export default rootRouter
