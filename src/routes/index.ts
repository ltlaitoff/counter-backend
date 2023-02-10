import { Router } from 'express'
import debugRouter from './debug'

import { ColorRouter } from 'Color'
import { CategoryRouter } from 'Category'
import { StatisticRouter } from 'Statistic'
import { AuthorizationRouter } from 'Authorization'
import { InitializeRouter } from 'Initialize'

const rootRouter = Router()

rootRouter.use(ColorRouter.path, ColorRouter.router)
rootRouter.use(CategoryRouter.path, CategoryRouter.router)
rootRouter.use(StatisticRouter.path, StatisticRouter.router)
rootRouter.use(AuthorizationRouter.path, AuthorizationRouter.router)
rootRouter.use(InitializeRouter.path, InitializeRouter.router)

rootRouter.use('/', debugRouter)

export default rootRouter
