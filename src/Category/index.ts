import { ROUTER_PATH } from './config'
import * as helpers from './helpers'
import * as types from './types'
import * as services from './services'
import { CategoryModel } from './model'
import router from './category.router'

export default {
	helpers,
	types,
	services
}

const CategoryRouter = {
	router,
	path: ROUTER_PATH
}

export {
	helpers as CategoryHelpers,
	types as CategoryTypes,
	services as CategoryServices,
	CategoryRouter,
	CategoryModel
}
