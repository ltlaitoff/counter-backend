import * as helpers from './helpers'
import * as types from './types'
import * as services from './services'
import { StatisticModel } from './model'
import StatisticRouter from './statistic.router'

export default {
	helpers,
	types,
	services
}

export {
	helpers as StatisticHelpers,
	types as StatisticTypes,
	services as StatisticServices,
	StatisticRouter,
	StatisticModel
}
