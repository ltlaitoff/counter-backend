import { Color } from 'models'
import { Color as ColorType } from 'types'

export const createColor = (data: ColorType) => {
	return Color.create(data)
}
