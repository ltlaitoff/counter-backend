import { Router } from 'express'
import authorizationRouter from './authorization'
import debugRouter from './debug'
import initializeRouter from './initialize'
import statisticRouter from './statistic'

import { ColorRouter } from 'Color'
import { CategoryRouter } from 'Category'

const rootRouter = Router()

rootRouter.use(authorizationRouter)
rootRouter.use(initializeRouter)
rootRouter.use(statisticRouter)

rootRouter.use(ColorRouter.path, ColorRouter.router)
rootRouter.use(CategoryRouter.path, CategoryRouter.router)

rootRouter.use('/', debugRouter)

export default rootRouter
