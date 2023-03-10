import { Schema, model } from 'mongoose'
import { CategoryModel } from 'Category'
import { UserModel } from 'User'

import { StatisticTypes } from '..'

const statisticSchema = new Schema<StatisticTypes.Statistic>(
	{
		user: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
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

export default Statistic
