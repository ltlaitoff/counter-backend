import { HydratedDocument } from 'mongoose'
import { Group } from './category-group.schema'

export type IGroup = HydratedDocument<Group>
