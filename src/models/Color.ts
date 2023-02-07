import { Schema, model } from 'mongoose'
import { Color as ColorType } from 'types'

const colorSchema = new Schema<ColorType>(
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
