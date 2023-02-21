import { Schema } from 'mongoose'
import { ColorModel, ColorTypes } from '..'

export const updateColor = (
	_id: Schema.Types.ObjectId,
	data: Partial<ColorTypes.Color>
) => {
	return ColorModel.updateOne({ _id }, data)
}
