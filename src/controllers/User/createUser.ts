import { User, IUser } from '../../models'

export const createUser = (data: IUser) => {
	return User.create(data)
}
