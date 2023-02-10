import mongoose, { ObjectId } from 'mongoose'
import { CategoryModel } from '..'

export const getCategoryById = async (categoryId: ObjectId | string) => {
	let _id = null

	// [ ] TODO: Move it to helper function
	if (typeof categoryId === 'string') {
		_id = new mongoose.Schema.Types.ObjectId(categoryId)
	} else {
		_id = categoryId
	}

	// TODO: Change it to servive
	return await CategoryModel.findOne({ _id: _id })
}
