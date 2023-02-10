import { ObjectId } from 'mongoose'
import { ColorHelpers, ColorTypes } from 'Color'

import { CategoryHelpers } from '..'

export const intializeUserDefaultCategories = async (userId: ObjectId) => {
	const colors = await ColorHelpers.initializeDefaultColors()

	// TODO: Move it
	const DEFAULT_CATEGORIES = [
		{
			name: 'Pull-ups',
			comment: 'Pull ups count',
			color: colors[ColorTypes.ColorsNames.RED],
			order: 1
		},
		{
			name: 'Push-ups',
			comment: 'Push ups count',
			color: colors[ColorTypes.ColorsNames.GREEN],
			order: 2
		},
		{
			name: 'Wall slides',
			comment: 'Pull ups count',
			color: colors[ColorTypes.ColorsNames.BLUE],
			order: 3
		}
	]

	console.log(DEFAULT_CATEGORIES)

	return DEFAULT_CATEGORIES.map(defaultCategory => {
		return CategoryHelpers.findOrCreateCategory({
			user: userId,
			...defaultCategory
		})
	})
}
