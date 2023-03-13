import { ObjectId } from 'mongoose'

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

export interface Color {
	_id?: ObjectId
	name: ColorsNames
	colorHEX: string
	order: number
}
