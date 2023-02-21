import { ColorModel, ColorTypes } from '..'
import { ColorUtils } from 'Color'

export const removeColor = async (data: ColorTypes.Color) => {
	ColorUtils.serviceDebugMessage('remove', JSON.stringify(data))

	return await ColorModel.deleteOne(data)
}
