import { Schema, model } from 'mongoose'
import { ColorTypes } from '..'

const colorSchema = new Schema<ColorTypes.Color>(
	{
		name: { type: String, required: true },
		colorHEX: { type: String, required: true }
	},
	{
		timestamps: true
	}
)

const Color = model('Color', colorSchema)

export default Color
