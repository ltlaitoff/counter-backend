import { IUser } from 'models'
import { checkIsUserExists, createUser } from '.'

export const findOrCreateUser = async (data: IUser): Promise<IUser> => {
	const findedUser = await checkIsUserExists(data)

	if (findedUser !== null) {
		return findedUser
	}

	const createdUser = await createUser(data)

	return createdUser
}
