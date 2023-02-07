import { ColorModel, ColorTypes } from '..'

export const createColor = (data: ColorTypes.Color) => {
	return ColorModel.create(data)
}
