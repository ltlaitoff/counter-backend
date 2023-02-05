import Router from 'express'
import { routeContollers as categoryController } from 'controllers/Category'

const categoryRouter = Router()

categoryRouter.get('/category/all', categoryController.getAllCategories)

export default categoryRouter
