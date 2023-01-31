import { Schema, model } from 'mongoose'
import { Category, User } from '.'

import { IStatistic } from 'types/Statistic.types'

const statisticSchema = new Schema<IStatistic>(
	{
		user: { type: Schema.Types.ObjectId, ref: User, required: true },
		date: { type: Date, required: true },
		count: { type: Number, required: true },
		comment: { type: String, required: true },
		category: { type: Schema.Types.ObjectId, ref: Category, required: true },
		summ: { type: Number, required: true }
	},
	{
		timestamps: true
	}
)

const Statistic = model('Statistic', statisticSchema)

export { Statistic }
