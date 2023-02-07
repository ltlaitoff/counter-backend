import { ObjectId } from 'mongoose'

export interface IStatistic {
	_id?: ObjectId
	user: ObjectId
	date: Date
	count: number
	comment: string
	category: ObjectId
	summ: number
}
