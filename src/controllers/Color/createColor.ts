import { Color, IColor } from '../../models'

export const createColor = (data: IColor) => {
	return Color.create(data)
}
