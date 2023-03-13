import { ObjectId } from 'mongoose'

import { ColorTypes } from '../../Color'
import { ColorServices } from '..'

type ColorWithId = ColorTypes.Color & { _id: ObjectId }

export const removeDuplicates = (all: ColorWithId[]) => {
	const cache: Record<string, string> = {}

	const forDelete: Array<ColorWithId> = []

	all.forEach(item => {
		if (item.name in cache) {
			forDelete.push(item)
			return
		}

		cache[item.name] = item.colorHEX
	})

	forDelete.forEach(color => {
		ColorServices.removeColor(color)
	})
}
