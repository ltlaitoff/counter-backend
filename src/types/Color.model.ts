import { ObjectId } from 'mongoose'

export enum ColorsNames {
	RED = 'red',
	GREEN = 'green',
	BLUE = 'blue'
}

export interface Color {
	_id?: ObjectId
	name: ColorsNames
	colorHEX: string
}
