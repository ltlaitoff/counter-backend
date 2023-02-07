import { ObjectId } from 'mongoose'
import { ColorHelpers, ColorTypes } from 'Color'

import { findOrCreateCategory } from '.'

export const intializeUserDefaultCategories = async (userId: ObjectId) => {
	const colors = await ColorHelpers.initializeDefaultColors()

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
		return findOrCreateCategory({ user: userId, ...defaultCategory })
	})
}
