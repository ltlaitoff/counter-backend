import { Schema, model } from 'mongoose'
import { IColor } from '../types/Color.types'

const colorSchema = new Schema<IColor>(
	{
		name: { type: String, required: true },
		colorHEX: { type: String, required: true }
	},
	{
		timestamps: true
	}
)

const Color = model('Color', colorSchema)

export { Color }
