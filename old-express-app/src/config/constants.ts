import { ColorTypes } from '../Color'

export const DEFAULT_COLORS = [
	{
		name: ColorTypes.ColorsNames.RED,
		colorHEX: '#ef4444',
		order: 1
	},
	{
		name: ColorTypes.ColorsNames.FUCHSIA,
		colorHEX: '#d946ef',
		order: 2
	},
	{
		name: ColorTypes.ColorsNames.BLUE,
		colorHEX: '#3b82f6',
		order: 3
	},
	{
		name: ColorTypes.ColorsNames.CYAN,
		colorHEX: '#06b6d4',
		order: 4
	},
	{
		name: ColorTypes.ColorsNames.EMERALD,
		colorHEX: '#10b981',
		order: 5
	},
	{
		name: ColorTypes.ColorsNames.LIME,
		colorHEX: '#84cc16',
		order: 6
	},
	{
		name: ColorTypes.ColorsNames.GRAY,
		colorHEX: '#6b7280',
		order: 7
	},
	{
		name: ColorTypes.ColorsNames.AMBER,
		colorHEX: '#f59e0b',
		order: 8
	}
]

// 2 years in miliseconds
export const COOKIE_MAX_AGE = 2 * 360 * 24 * 60 * 60 * 1000
