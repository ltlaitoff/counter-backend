import { Body, Injectable } from '@nestjs/common'

import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model, ObjectId } from 'mongoose'
import { IUser } from './user.interface'
import { User } from './user.schema'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

	async create(
		@Body() createUserDto: CreateUserDto,
		options: {
			intializeDefaultCategories: boolean
		} = { intializeDefaultCategories: false }
	): Promise<IUser> {
		const newUser = await new this.userModel(createUserDto)

		if (options.intializeDefaultCategories) {
			// TODO: Uncomment after migrate categories
			// CategoryHelpers.intializeUserDefaultCategories(newUser._id)
		}

		return newUser.save()
	}

	async find(
		data: Partial<User & { _id: string | ObjectId | mongoose.Types.ObjectId }>
	): Promise<IUser | null> {
		return await this.userModel.findOne(data).lean()
	}

	async findOrCreate(data: User): Promise<IUser> {
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

		const findedUser = await this.find(dataForFind)

		if (findedUser !== null) {
			return findedUser
		}

		return await this.create(data)
	}
}
