import mongoose, { ObjectId } from 'mongoose'
import { Category } from '../../models'

export const getCategoryById = async (categoryId: ObjectId | string) => {
	let _id = null

	// [ ] TODO: Move it to helper function
	if (typeof categoryId === 'string') {
		_id = new mongoose.Schema.Types.ObjectId(categoryId)
	} else {
		_id = categoryId
	}

	return await Category.findOne({ _id: _id })
}
