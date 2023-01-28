import { Schema, model, ObjectId } from 'mongoose'
import { User, Color } from '.'

interface ICategory {
	user: ObjectId
	name: string
	comment: string
	color: ObjectId
	order: number
}

const categorySchema = new Schema<ICategory>(
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

export { Category, ICategory }
