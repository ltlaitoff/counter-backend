import { Schema, model } from 'mongoose'
import { Category as CategoryType } from 'types'
import { User, Color } from '.'

const categorySchema = new Schema<CategoryType>(
	{
		user: { type: Schema.Types.ObjectId, ref: User, required: true },
		name: { type: String, required: true },
		comment: { type: String, required: true },
		color: { type: Schema.Types.ObjectId, ref: Color, required: true },
		order: { type: Number, required: true }
	},
	{
		timestamps: true
	}
)

const Category = model('Category', categorySchema)

export { Category }
