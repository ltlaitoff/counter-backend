import { ObjectId } from 'mongoose'

/*
	TODO: Find better method save colorNames
*/
export const enum ColorsNames {
	RED = 'red',
	BLUE = 'blue',
	SLATE = 'slate',
	ORANGE = 'orange',
	LIME = 'lime',
	GREEN = 'green',
	EMERALD = 'emerald',
	ROSE = 'rose',
	PINK = 'pink',
	PURPLE = 'purple',
	INDIGO = 'indigo',
	SKY = 'sky'
}

export interface Color {
	_id?: ObjectId
	name: ColorsNames
	colorHEX: string
}
