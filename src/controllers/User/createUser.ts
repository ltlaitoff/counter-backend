import { User as UserType } from 'types'
import { User } from 'models'
import { CategoryHelpers } from 'Category'

export const createUser = async (data: UserType) => {
	const user = await User.create(data)

	CategoryHelpers.intializeUserDefaultCategories(user._id)

	return user
}
