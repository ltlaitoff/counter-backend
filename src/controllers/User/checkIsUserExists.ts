import { User as UserType } from 'types'
import { User } from 'models'

export const checkIsUserExists = async (data: UserType) => {
	return await User.findOne(data).lean()
}
