import { Router } from 'express'
import authorizationRouter from './authorization'
import debugRouter from './debug'
import initializeRouter from './initialize'

import { ColorRouter } from 'Color'
import { CategoryRouter } from 'Category'
import { StatisticRouter } from 'Statistic'

const rootRouter = Router()

rootRouter.use(authorizationRouter)
rootRouter.use(initializeRouter)

rootRouter.use(ColorRouter.path, ColorRouter.router)
rootRouter.use(CategoryRouter.path, CategoryRouter.router)
rootRouter.use(StatisticRouter.path, StatisticRouter.router)

rootRouter.use('/', debugRouter)

export default rootRouter
