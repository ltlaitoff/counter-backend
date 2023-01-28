import { User, IUser } from '../../models'

export const checkIsUserExists = async (data: IUser) => {
	return await User.findOne(data)
}
