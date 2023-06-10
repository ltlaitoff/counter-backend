import { HydratedDocument } from 'mongoose'
import { Sessions } from './session.schema'

export type ISessions = HydratedDocument<Sessions>
