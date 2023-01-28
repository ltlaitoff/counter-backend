import { Schema, model } from 'mongoose'
import { User, Color } from '.'

const categorySchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: User, required: true },
		name: { type: String, required: true },
		comment: { type: String, required: true },
		color: { type: Schema.Types.ObjectId, ref: Color, required: true },
		order: { type: String, required: true }
	},
	{
		timestamps: true
	}
)

const Category = model('Category', categorySchema)

export { Category }