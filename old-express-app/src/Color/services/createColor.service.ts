import { ColorModel, ColorTypes } from '..'
import { ColorUtils } from 'Color'

export const createColor = async (data: ColorTypes.Color) => {
	ColorUtils.serviceDebugMessage('create', JSON.stringify(data))

	return await ColorModel.create(data)
}
