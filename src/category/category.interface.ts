import { HydratedDocument } from 'mongoose'
import { Category } from './category.schema'

export type ICategory = HydratedDocument<Category>
