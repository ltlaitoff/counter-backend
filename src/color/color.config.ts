import { ColorsNames } from './color.interface'
import { Color } from './color.schema'

export const DEFAULT_COLORS: Color[] = [
	{
		name: ColorsNames.RED,
		colorHEX: '#ef4444',
		order: 1
	},
	{
		name: ColorsNames.FUCHSIA,
		colorHEX: '#d946ef',
		order: 2
	},
	{
		name: ColorsNames.BLUE,
		colorHEX: '#3b82f6',
		order: 3
	},
	{
		name: ColorsNames.CYAN,
		colorHEX: '#06b6d4',
		order: 4
	},
	{
		name: ColorsNames.EMERALD,
		colorHEX: '#10b981',
		order: 5
	},
	{
		name: ColorsNames.LIME,
		colorHEX: '#84cc16',
		order: 6
	},
	{
		name: ColorsNames.GRAY,
		colorHEX: '#6b7280',
		order: 7
	},
	{
		name: ColorsNames.AMBER,
		colorHEX: '#f59e0b',
		order: 8
	}
]
