import { HydratedDocument } from 'mongoose'
import { Color } from './color.schema'

export const enum ColorsNames {
	GRAY = 'gray',
	RED = 'red',
	AMBER = 'amber',
	LIME = 'lime',
	EMERALD = 'emerald',
	CYAN = 'cyan',
	BLUE = 'blue',
	FUCHSIA = 'fuchsia'
}

export type IColor = HydratedDocument<Color>
