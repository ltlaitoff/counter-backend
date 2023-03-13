import { ObjectId } from 'mongoose'

import { ColorTypes } from '..'
import { ColorServices } from '..'

export const removeUnUsedColors = (
	all: (ColorTypes.Color & { _id: ObjectId })[],
	defaults: ColorTypes.Color[]
) => {
	all.forEach(color => {
		const findedDefaultColor = defaults.find(defaultColor => {
			return (
				defaultColor.name === color.name ||
				defaultColor.colorHEX === color.colorHEX
			)
		})

		if (findedDefaultColor === undefined) {
			ColorServices.removeColor(color)
			return
		}
	})
}
