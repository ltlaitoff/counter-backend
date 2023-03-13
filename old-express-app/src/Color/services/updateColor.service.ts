import { Schema } from 'mongoose'
import { ColorModel, ColorTypes, ColorUtils } from '..'

export const updateColor = async (
	_id: Schema.Types.ObjectId,
	data: Partial<ColorTypes.Color>
) => {
	ColorUtils.serviceDebugMessage('update', String(_id), JSON.stringify(data))

	return await ColorModel.updateOne({ _id }, data)
}
