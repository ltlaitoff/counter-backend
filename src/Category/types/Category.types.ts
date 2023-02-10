import { ObjectId } from 'mongoose'

export interface Category {
	user: ObjectId
	name: string
	comment: string
	color: ObjectId
	order: number
}
