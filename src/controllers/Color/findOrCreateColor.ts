import { Color as ColorType } from 'types'
import { findColor, createColor } from '.'

export const findOrCreateColor = async (data: ColorType) => {
	const findedColor = await findColor(data)

	if (findedColor !== null) {
		return findedColor
	}

	const createdColor = await createColor(data)

	return createdColor
}
