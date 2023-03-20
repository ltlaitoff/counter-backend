import { HydratedDocument } from 'mongoose'
import { User } from './user.schema'

export type IUser = HydratedDocument<User>
