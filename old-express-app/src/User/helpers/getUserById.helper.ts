import mongoose, { ObjectId } from 'mongoose'
import { UserServices } from '..'

export const getUserById = async (id: string | ObjectId) => {
	let _id: ObjectId | null = null

	// [ ] TODO: Move it to helper function
	if (typeof id === 'string') {
		_id = new mongoose.Types.ObjectId(id) as unknown as ObjectId
	} else {
		_id = id
	}

	const findedUser = await UserServices.findUser({ _id: _id })

	return findedUser
}
