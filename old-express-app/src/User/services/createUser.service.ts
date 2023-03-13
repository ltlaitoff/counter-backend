import { UserTypes, UserModel } from '..'
import { CategoryHelpers } from 'Category'

interface CreateUserOptions {
	intializeDefaultCategories: boolean
}

export const createUser = async (
	data: UserTypes.User,
	options: CreateUserOptions = {
		intializeDefaultCategories: true
	}
) => {
	const user = await UserModel.create(data)

	if (options.intializeDefaultCategories) {
		CategoryHelpers.intializeUserDefaultCategories(user._id)
	}

	return user
}
