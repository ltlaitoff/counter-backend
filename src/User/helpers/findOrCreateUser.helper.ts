import { UserTypes, UserServices } from '..'

export const findOrCreateUser = async (
	data: UserTypes.User
): Promise<UserTypes.User> => {
	const findedUser = await UserServices.findUser(data)

	if (findedUser !== null) {
		return findedUser
	}

	const createdUser = await UserServices.createUser(data)

	return createdUser
}
