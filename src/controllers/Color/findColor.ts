import { Color } from 'models'
import { Color as ColorType } from 'types'

export const findColor = async (data: ColorType) => {
	return await Color.findOne(data)
}
