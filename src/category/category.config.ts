import { ColorsNames } from 'src/color/color.interface'

export const DEFAULT_CATEGORIES = [
	{
		name: 'Pull-ups',
		comment: 'Pull ups count',
		color: ColorsNames.RED,
		order: 1
	},
	{
		name: 'Push-ups',
		comment: 'Push ups count',
		color: ColorsNames.EMERALD,
		order: 2
	},
	{
		name: 'Wall slides',
		comment: 'Pull ups count',
		color: ColorsNames.BLUE,
		order: 3
	}
]

export const PROJECTIONS = `-__v -createdAt -updatedAt`
