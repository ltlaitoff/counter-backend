import { Router } from 'express'
import debugRouter from './debug'
import initializeRouter from './initialize'

import { ColorRouter } from 'Color'
import { CategoryRouter } from 'Category'
import { StatisticRouter } from 'Statistic'
import { AuthorizationRouter } from 'Authorization'

const rootRouter = Router()

rootRouter.use(initializeRouter)

rootRouter.use(ColorRouter.path, ColorRouter.router)
rootRouter.use(CategoryRouter.path, CategoryRouter.router)
rootRouter.use(StatisticRouter.path, StatisticRouter.router)
rootRouter.use(AuthorizationRouter.path, AuthorizationRouter.router)

rootRouter.use('/', debugRouter)

export default rootRouter
