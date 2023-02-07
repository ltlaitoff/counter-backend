import { User as UserType } from 'types'
import { checkIsUserExists, createUser } from '.'

export const findOrCreateUser = async (data: UserType): Promise<UserType> => {
	const findedUser = await checkIsUserExists(data)

	if (findedUser !== null) {
		return findedUser
	}

	const createdUser = await createUser(data)

	return createdUser
}
