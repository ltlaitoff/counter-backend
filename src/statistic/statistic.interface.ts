import { HydratedDocument } from 'mongoose'
import { Statistic } from './statistic.schema'

export type IStatistic = HydratedDocument<Statistic>
