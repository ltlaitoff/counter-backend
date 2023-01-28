import { Schema, model } from 'mongoose'

interface IColor {
	name: string
	colorHEX: string
}

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

export { Color, IColor }
