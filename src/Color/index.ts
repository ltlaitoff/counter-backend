import { ROUTER_PATH } from './config'
import * as helpers from './helpers'
import * as types from './types'
import * as services from './services'
import { ColorModel } from './model'
import router from './color.router'

export default {
	helpers,
	types,
	services
}

const ColorRouter = {
	router,
	path: ROUTER_PATH
}

export {
	helpers as ColorHelpers,
	types as ColorTypes,
	services as ColorServices,
	ColorRouter,
	ColorModel
}
