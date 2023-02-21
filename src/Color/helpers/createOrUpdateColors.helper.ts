import { ObjectId } from 'mongoose'

import { ColorTypes } from 'Color'
import { ColorServices } from '..'

export const createOrUpdateColors = (
	all: (ColorTypes.Color & { _id: ObjectId })[],
	defaults: ColorTypes.Color[]
) => {
	defaults.forEach(defaultColor => {
		const findedColor = all.find(color => {
			return (
				defaultColor.name === color.name ||
				defaultColor.colorHEX === color.colorHEX
			)
		})

		if (findedColor === undefined) {
			ColorServices.createColor(defaultColor)
			return
		}

		if (
			findedColor.name !== defaultColor.name ||
			findedColor.colorHEX !== defaultColor.colorHEX
		) {
			ColorServices.updateColor(findedColor._id, defaultColor)
			return
		}
	})
}
