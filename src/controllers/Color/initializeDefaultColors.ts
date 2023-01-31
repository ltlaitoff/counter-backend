import { findOrCreateColor } from '.'
import { ObjectId } from 'mongoose'
import { ColorsNames } from 'types/Color.types'
import { DEFAULT_COLORS } from 'config'

export const initializeDefaultColors = async () => {
	const colorItems = await Promise.all(
		DEFAULT_COLORS.map(defaultColorItem => {
			return findOrCreateColor(defaultColorItem)
		})
	)

	const resultObject: any = {}

	colorItems.forEach(item => {
		if (item._id) {
			resultObject[item.name] = item._id
		}
	})

	return resultObject as { [key in ColorsNames]: ObjectId }
}
