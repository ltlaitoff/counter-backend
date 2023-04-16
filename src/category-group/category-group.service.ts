import { Body, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserIdSession } from 'src/app.interfaces'
import { IGroup } from './category-group.interface'
import { Group } from './category-group.schema'
import { PROJECTIONS } from './category-group.config'
import { CreateCategoryGroupDto } from './dto/create-category-group.dto'
import { UpdateCategoryGroupDto } from './dto/update-category-group.dto'

@Injectable()
export class CategoryGroupService {
	constructor(
		@InjectModel(Group.name) private categoryGroupModel: Model<IGroup>
	) {}

	async getAll(userId: UserIdSession): Promise<Group[]> {
		const userAllCategories = this.categoryGroupModel.find(
			{ user: userId },
			PROJECTIONS
		)

		return await userAllCategories.lean()
	}

	async add(
		@Body() createCategoryGroupDto: CreateCategoryGroupDto,
		userId: UserIdSession
	) {
		const dataForAdd = {
			user: userId,
			name: createCategoryGroupDto.name
		}

		const newCategoryGroup = await new this.categoryGroupModel(dataForAdd)
		const newCategoryGroupDocument = await newCategoryGroup.save()

		return newCategoryGroupDocument
	}

	async delete(id: string, userId: UserIdSession): Promise<unknown> {
		return this.categoryGroupModel.deleteOne({
			_id: id,
			user: userId
		})
	}

	async edit(id: string, body: UpdateCategoryGroupDto, userId: UserIdSession) {
		const updatedCategoryGroup =
			await this.categoryGroupModel.findByIdAndUpdate(
				{ _id: id, user: userId },
				body,
				{ new: true }
			)

		if (!updatedCategoryGroup) {
			return null
		}

		const updatedCategoryGroupDocument = await updatedCategoryGroup.save()

		return updatedCategoryGroupDocument
	}
}
