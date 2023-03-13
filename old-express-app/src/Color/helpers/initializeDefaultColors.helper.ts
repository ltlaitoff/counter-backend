import { ObjectId } from 'mongoose'

import { DEFAULT_COLORS } from '../../config'
import { ColorTypes, ColorServices, ColorHelpers } from '..'

export const initializeDefaultColors = async () => {
	const allColors = await ColorServices.findColors()

	ColorHelpers.createOrUpdateColors(allColors, DEFAULT_COLORS)
	ColorHelpers.removeUnUsedColors(allColors, DEFAULT_COLORS)
	ColorHelpers.removeDuplicates(allColors)

	const colorItems = await ColorServices.findColors()

	// TODO: Remove any type
	const resultObject: any = {}

	colorItems.forEach(item => {
		if (item._id) {
			resultObject[item.name] = item._id
		}
	})

	return resultObject as { [key in ColorTypes.ColorsNames]: ObjectId }
}
