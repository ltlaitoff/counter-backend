import { ROUTER_PATH } from './config'
import * as helpers from './helpers'
import * as types from './types'
import * as services from './services'
import { StatisticModel } from './model'
import router from './statistic.router'

export default {
	helpers,
	types,
	services
}

const StatisticRouter = {
	router,
	path: ROUTER_PATH
}

export {
	helpers as StatisticHelpers,
	types as StatisticTypes,
	services as StatisticServices,
	StatisticRouter,
	StatisticModel
}