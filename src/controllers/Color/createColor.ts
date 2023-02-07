import { Color } from 'models'
import { IColor } from 'types'

export const createColor = (data: IColor) => {
	return Color.create(data)
}
