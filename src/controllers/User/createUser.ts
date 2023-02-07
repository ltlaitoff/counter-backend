import { User as UserType } from 'types'
import { User } from 'models'
import { intializeUserDefaultCategories } from 'controllers/Category'

export const createUser = async (data: UserType) => {
	const user = await User.create(data)

	intializeUserDefaultCategories(user._id)

	return user
}
