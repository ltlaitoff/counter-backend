import { Body, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserIdSession } from 'src/app.interfaces'
import { IGroup } from './category-group.interface'
import { Group } from './category-group.schema'
import { PROJECTIONS } from './category-group.config'
import { CreateCategoryGroupDto } from './dto/create-category-group.dto'
import { UpdateCategoryGroupDto } from './dto/update-category-group.dto'
import { ReorderCategoryGroupDto } from './dto/reorder-category-group.dto'

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

		const result = await userAllCategories.lean()

		console.log(result)

		return result
	}

	async add(
		@Body() createCategoryGroupDto: CreateCategoryGroupDto,
		userId: UserIdSession
	) {
		const lastOrderId = await this.getLastOrder(userId)

		const dataForAdd = {
			user: userId,
			name: createCategoryGroupDto.name,
			color: createCategoryGroupDto.color,
			order: lastOrderId === null ? 0 : lastOrderId + 1
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

	/* reorder */
	async reorder(
		body: ReorderCategoryGroupDto,
		userId: UserIdSession
	): Promise<ReorderCategoryGroupDto[] | null> {
		if (body.currentIndex === body.previousIndex) return null

		const categoriesForUpdateOrder = await this.getCategoriesByOrderInRange(
			userId,
			body.previousIndex,
			body.currentIndex
		)

		const updatedCategoriesForUpdateOrder = await this.changeCategoriesOrders(
			categoriesForUpdateOrder,
			body.previousIndex
		)

		const result: ReorderCategoryGroupDto[] =
			await this.transformToReorderResult(updatedCategoriesForUpdateOrder)

		await this.updateOrders(result, userId)

		return result
	}

	private async getCategoriesByOrderInRange(
		userId: UserIdSession,
		previousIndex: number,
		currentIndex: number
	): Promise<IGroup[]> {
		const order =
			previousIndex < currentIndex
				? { $gte: previousIndex, $lte: currentIndex }
				: { $gte: currentIndex, $lte: previousIndex }

		const sort = {
			order: previousIndex < currentIndex ? 1 : -1
		}

		return await this.categoryGroupModel
			.find(
				{
					order: order,
					user: userId
				},
				{},
				{
					sort: sort
				}
			)
			.lean()
	}

	private async changeCategoriesOrders(
		categories: (IGroup & { previousIndex?: number })[],
		previousIndex: number
	) {
		const lastIndex = categories.at(-1)?.order

		if (lastIndex === undefined) {
			throw new Error('ERR')
		}

		for (let i = categories.length - 2; i >= 0; i--) {
			const currentElement = categories.at(i)

			const indexNextElement = i + 1 > categories.length - 1 ? 0 : i + 1
			const nextElement = categories.at(indexNextElement)

			if (currentElement === undefined || nextElement === undefined) {
				throw new Error(
					`currentElement || nextElement is undefined in reorder. categories = ${JSON.stringify(
						categories
					)}`
				)
			}

			nextElement.previousIndex = nextElement.order
			nextElement.order = currentElement.order
		}

		categories[0].previousIndex = previousIndex
		categories[0].order = lastIndex

		return categories
	}

	private async transformToReorderResult(
		categories: (IGroup & { previousIndex?: number })[]
	): Promise<ReorderCategoryGroupDto[]> {
		return categories.map(item => {
			if (item.previousIndex == undefined) {
				throw new Error(
					`item.previousIndex is undefined in transformToReorderResult. categories = ${JSON.stringify(
						categories
					)}`
				)
			}

			return {
				categoryGroupId: item._id.toString(),
				currentIndex: item.order,
				previousIndex: item.previousIndex
			}
		})
	}

	private async updateOrders(
		categories: ReorderCategoryGroupDto[],
		userId: UserIdSession
	) {
		await Promise.all(
			categories.map(async item => {
				const updatedCategory = await this.categoryGroupModel
					.findByIdAndUpdate(
						{ _id: item.categoryGroupId, user: userId },
						{
							order: item.currentIndex
						},
						{ new: true }
					)
					.lean()

				if (!updatedCategory) {
					throw new Error(
						`Error update categories reorder. Category = ${JSON.stringify(
							item
						)}`
					)
				}

				return updatedCategory
			})
		)
	}

	/* reorder end */

	private async getLastOrder(userId: UserIdSession) {
		const allUserCategoryGroups = await this.getAll(userId)

		const result = allUserCategoryGroups.reduce(
			(prev, categoryGroup) =>
				categoryGroup.order > prev ? categoryGroup.order : prev,
			-1
		)

		return result === -1 ? null : result
	}
}
