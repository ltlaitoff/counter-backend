import { HydratedDocument } from 'mongoose'
import { Group } from './category-group.schema'

// TODO: Renamed to ICategoryGroup
export type IGroup = HydratedDocument<Group>
