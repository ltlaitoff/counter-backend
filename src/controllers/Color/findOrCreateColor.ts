import { IColor } from '../../types/Color.types'
import { findColor, createColor } from '.'

export const findOrCreateColor = async (data: IColor) => {
	const findedColor = await findColor(data)

	if (findedColor !== null) {
		return findedColor
	}

	const createdColor = await createColor(data)

	return createdColor
}
