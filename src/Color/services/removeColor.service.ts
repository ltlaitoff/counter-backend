import { ColorModel, ColorTypes } from '..'

export const removeColor = (data: ColorTypes.Color) => {
	return ColorModel.deleteOne(data)
}
