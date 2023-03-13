import { Router } from 'express'
import * as CategoryRoutes from './routes'

const categoryRouter = Router()

categoryRouter.get('/all', CategoryRoutes.getAllCategories)
categoryRouter.post('/add', CategoryRoutes.addCategory)
categoryRouter.delete('/:id', CategoryRoutes.deleteCategory)

export default categoryRouter
