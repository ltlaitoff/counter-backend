import { UserTypes, UserServices } from '..'

export const findOrCreateUser = async (
	data: UserTypes.User
): Promise<UserTypes.User> => {
	/*
	 * ! SECURITY: On user change email or name system create new user account !
	 */

	/*
		Google and update picture link to avatar
		findUser must be only by email and name
	*/
	const dataForFind = {
		name: data.name,
		email: data.email,
		email_verified: data.email_verified,
		given_name: data.given_name,
		family_name: data.family_name
	}

	const findedUser = await UserServices.findUser(dataForFind)

	if (findedUser !== null) {
		return findedUser
	}

	const createdUser = await UserServices.createUser(data)

	return createdUser
}
