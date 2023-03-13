import { ColorModel, ColorTypes } from '..'
import { ColorUtils } from '..'

export const removeColor: any = async (data: ColorTypes.Color) => {
	ColorUtils.serviceDebugMessage('remove', JSON.stringify(data))

	return await ColorModel.deleteOne(data)
}
