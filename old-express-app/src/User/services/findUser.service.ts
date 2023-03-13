import { UserTypes, UserModel } from '..'

type FindUserData = Partial<UserTypes.User>

export const findUser = async (data: FindUserData) => {
	return await UserModel.findOne(data).lean()
}
