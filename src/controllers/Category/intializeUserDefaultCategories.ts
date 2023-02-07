import { ObjectId } from 'mongoose'
import { ColorsNames } from 'types'
import { initializeDefaultColors } from 'controllers/Color'
import { findOrCreateCategory } from '.'

export const intializeUserDefaultCategories = async (userId: ObjectId) => {
	const colors = await initializeDefaultColors()

	const DEFAULT_CATEGORIES = [
		{
			name: 'Pull-ups',
			comment: 'Pull ups count',
			color: colors[ColorsNames.RED],
			order: 1
		},
		{
			name: 'Push-ups',
			comment: 'Push ups count',
			color: colors[ColorsNames.GREEN],
			order: 2
		},
		{
			name: 'Wall slides',
			comment: 'Pull ups count',
			color: colors[ColorsNames.BLUE],
			order: 3
		}
	]

	console.log(DEFAULT_CATEGORIES)

	return DEFAULT_CATEGORIES.map(defaultCategory => {
		return findOrCreateCategory({ user: userId, ...defaultCategory })
	})
}
