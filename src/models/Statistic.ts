import { Schema, model } from 'mongoose'
import { CategoryModel } from 'Category'
import { User } from '.'

import { Statistic as StatisticType } from 'types'

const statisticSchema = new Schema<StatisticType>(
	{
		user: { type: Schema.Types.ObjectId, ref: User, required: true },
		date: { type: Date, required: true },
		count: { type: Number, required: true },
		comment: { type: String, required: true },
		category: {
			type: Schema.Types.ObjectId,
			ref: CategoryModel,
			required: true
		},
		summ: { type: Number, required: true }
	},
	{
		timestamps: true
	}
)

const Statistic = model('Statistic', statisticSchema)

export { Statistic }
