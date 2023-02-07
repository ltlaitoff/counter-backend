import Router from 'express'
import { routeContollers as categoryController } from 'controllers/Category'

const categoryRouter = Router()

categoryRouter.get('/category/all', categoryController.getAllCategories)
categoryRouter.post('/category/add', categoryController.addCategory)
categoryRouter.delete('/category/:id', categoryController.deleteCategory)

export default categoryRouter
