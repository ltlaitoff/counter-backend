import { Router } from 'express'

// import { ColorRouter } from '../Color'
import { CategoryRouter } from '../Category'
import { StatisticRouter } from '../Statistic'
// import { AuthorizationRouter } from '../Authorization'
import { InitializeRouter } from '../Initialize'
import { HomeRouter } from './home.route'

const rootRouter = Router()

rootRouter.use('/', HomeRouter)

/* XXX: Disable ColorRouter: Migrating to nest*/
// rootRouter.use('/color', ColorRouter)

rootRouter.use('/category', CategoryRouter)
rootRouter.use('/statistic', StatisticRouter)

/* XXX: Disable AuthorizationRouter: Migrating to nest*/
// rootRouter.use('/authorization', AuthorizationRouter)

rootRouter.use('/initialize', InitializeRouter)

export default rootRouter
