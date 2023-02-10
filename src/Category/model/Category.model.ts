import { Schema, model } from 'mongoose'
import { CategoryTypes } from '..'
import { User } from '../../models'
import { ColorModel } from 'Color'

const categorySchema = new Schema<CategoryTypes.Category>(
	{
		user: { type: Schema.Types.ObjectId, ref: User, required: true },
		name: { type: String, required: true },
		comment: { type: String, required: true },
		color: { type: Schema.Types.ObjectId, ref: ColorModel, required: true },
		order: { type: Number, required: true }
	},
	{
		timestamps: true
	}
)

const Category = model('Category', categorySchema)

export default Category
