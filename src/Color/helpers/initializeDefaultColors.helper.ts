import { ObjectId } from 'mongoose'

import { DEFAULT_COLORS } from 'config'
import { ColorTypes, ColorHelpers } from '..'

export const initializeDefaultColors = async () => {
	const colorItems = await Promise.all(
		DEFAULT_COLORS.map(defaultColorItem => {
			return ColorHelpers.findOrCreateColor(defaultColorItem)
		})
	)

	// TODO: Remove any type
	const resultObject: any = {}

	colorItems.forEach(item => {
		if (item._id) {
			resultObject[item.name] = item._id
		}
	})

	return resultObject as { [key in ColorTypes.ColorsNames]: ObjectId }
}
