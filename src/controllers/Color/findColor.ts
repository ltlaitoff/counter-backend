import { Color } from 'models'
import { IColor } from 'types'

export const findColor = async (data: IColor) => {
	return await Color.findOne(data)
}
