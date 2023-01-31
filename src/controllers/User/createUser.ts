import { User, IUser } from 'models'
import { intializeUserDefaultCategories } from 'controllers/Category'

export const createUser = async (data: IUser) => {
	const user = await User.create(data)

	intializeUserDefaultCategories(user._id)

	return user
}
