import mongoose, { ObjectId } from 'mongoose'
import { User } from 'models'

export const getUserById = async (id: string | ObjectId) => {
	let _id: ObjectId | null = null

	// [ ] TODO: Move it to helper function
	if (typeof id === 'string') {
		_id = new mongoose.Types.ObjectId(id) as unknown as ObjectId
	} else {
		_id = id
	}

	return await User.findOne({ _id: _id }).lean()
}
