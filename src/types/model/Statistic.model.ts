import { ObjectId } from 'mongoose'

export interface Statistic {
	_id?: ObjectId
	user: ObjectId
	date: Date
	count: number
	comment: string
	category: ObjectId
	summ: number
}
