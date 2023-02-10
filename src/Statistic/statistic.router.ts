import Router from 'express'
import * as StatisticRoutes from './routes'

const statisticRouter = Router()

statisticRouter.get('/all', StatisticRoutes.getAllRecords)
statisticRouter.get('/:recordId', StatisticRoutes.getByRecordId)
statisticRouter.post('/add', StatisticRoutes.addRecord)

export default statisticRouter
