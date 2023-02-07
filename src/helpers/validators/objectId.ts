import mongoose from 'mongoose'
import { ObjectId } from 'mongoose'

export const objectIdValidation = (value: unknown): null | ObjectId => {
	let resultValue = null

	if (value != undefined && typeof value === 'string') {
		if (mongoose.Types.ObjectId.isValid(value)) {
			resultValue = new mongoose.Schema.Types.ObjectId(value)
		}
	}

	return resultValue
}
