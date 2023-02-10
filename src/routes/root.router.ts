import { Router } from 'express'

import { ColorRouter } from 'Color'
import { CategoryRouter } from 'Category'
import { StatisticRouter } from 'Statistic'
import { AuthorizationRouter } from 'Authorization'
import { InitializeRouter } from 'Initialize'

const rootRouter = Router()

rootRouter.use('/color', ColorRouter.router)
rootRouter.use('/category', CategoryRouter.router)
rootRouter.use('/statistic', StatisticRouter.router)
rootRouter.use('/authorization', AuthorizationRouter.router)
rootRouter.use('/initialize', InitializeRouter.router)

export default rootRouter
