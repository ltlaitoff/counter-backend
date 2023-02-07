import { ObjectId } from 'mongoose'

export interface ICategory {
	user: ObjectId
	name: string
	comment: string
	color: ObjectId
	order: number
}
