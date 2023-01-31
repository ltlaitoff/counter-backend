import Router from 'express'
import * as initializeContoller from 'controllers/Initialize'

const initializeRouter = Router()

initializeRouter.get('/initialize', initializeContoller.initialize)

export default initializeRouter
