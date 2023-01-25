import { Router } from 'express'
import debugRouter from './debug'

const rootRouter = Router()

rootRouter.use('/', debugRouter)

export default rootRouter
