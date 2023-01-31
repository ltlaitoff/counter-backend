import Router from 'express'
import { routeContollers as statisticContoller } from 'controllers/Statistic'

const statisticRouter = Router()

statisticRouter.get('/statistic/all', statisticContoller.getAllRecords)
statisticRouter.get('/statistic/:recordId', statisticContoller.getByRecordId)

export default statisticRouter