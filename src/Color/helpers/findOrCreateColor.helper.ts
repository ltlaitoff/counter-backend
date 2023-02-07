import { ColorTypes, ColorServices } from '..'

export const findOrCreateColor = async (data: ColorTypes.Color) => {
	const findedColor = await ColorServices.findColor(data)

	if (findedColor !== null) {
		return findedColor
	}

	const createdColor = await ColorServices.createColor(data)

	return createdColor
}
