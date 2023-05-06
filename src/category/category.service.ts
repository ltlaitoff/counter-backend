import { Body, Injectable } from '@nestjs/common'
import { Category } from './category.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ICategory } from './category.interface'
import { CreateCategoryDto } from './dto/create-category.dto'
import { ColorService } from '../color/color.service'
import { DEFAULT_CATEGORIES, PROJECTIONS } from './category.config'
import { UserIdSession } from 'src/app.interfaces'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ReorderCategoryDto } from './dto/reorder-category.dto'

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category.name) private categoryModel: Model<ICategory>,
		private colorService: ColorService
	) {}

	async add(
		@Body() createCategoryDto: CreateCategoryDto,

		userId: UserIdSession
	) {
		const lastOrderId = await this.getLastOrder(userId)

		const dataForAdd = {
			user: userId,
			name: createCategoryDto.name,
			color: createCategoryDto.color,
			comment: createCategoryDto.comment,
			dimension: createCategoryDto.dimension,
			order: lastOrderId === null ? 0 : lastOrderId + 1
		}

		const newCategory = await new this.categoryModel(dataForAdd)

		const newCategoryDocument = await newCategory.save()

		return newCategoryDocument
	}

	async getAll(userId: UserIdSession): Promise<Category[]> {
		const userAllCategories = this.categoryModel.find(
			{ user: userId },
			PROJECTIONS
		)

		return await userAllCategories.lean()
	}

	async delete(id: string, userId: UserIdSession): Promise<unknown> {
		return this.categoryModel.deleteOne({
			_id: id,
			user: userId
		})
	}

	async edit(id: string, body: UpdateCategoryDto, userId: UserIdSession) {
		const updatedCategory = await this.categoryModel.findByIdAndUpdate(
			{ _id: id, user: userId },
			body,
			{ new: true }
		)

		if (!updatedCategory) {
			return null
		}

		const updatedCategoryDocument = await updatedCategory.save()

		return updatedCategoryDocument
	}

	private async getLastOrder(userId: UserIdSession) {
		const allUserCategories = await this.getAll(userId)

		const result = allUserCategories.reduce(
			(prev, category) => (category.order > prev ? category.order : prev),
			-1
		)

		return result === -1 ? null : result
	}

	async intializeUserDefaultCategories(userId: UserIdSession) {
		const colors = await this.colorService.initializeDefaultColors()

		const defaultCategoriesWithColorId = DEFAULT_CATEGORIES.map(item => ({
			...item,
			color: colors[item.color]
		}))

		return defaultCategoriesWithColorId.map(defaultCategory => {
			return this.add(defaultCategory, userId)
		})
	}

	/* reorder */
	async reorder(
		body: ReorderCategoryDto,
		userId: UserIdSession
	): Promise<ReorderCategoryDto[] | null> {
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

		const result: ReorderCategoryDto[] = await this.transformToReorderResult(
			updatedCategoriesForUpdateOrder
		)

		await this.updateOrders(result, userId)

		return result
	}

	private async getCategoriesByOrderInRange(
		userId: UserIdSession,
		previousIndex: number,
		currentIndex: number
	): Promise<ICategory[]> {
		const order =
			previousIndex < currentIndex
				? { $gte: previousIndex, $lte: currentIndex }
				: { $gte: currentIndex, $lte: previousIndex }

		const sort = {
			order: previousIndex < currentIndex ? 1 : -1
		}

		return await this.categoryModel
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
		categories: (ICategory & { previousIndex?: number })[],
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
		categories: (ICategory & { previousIndex?: number })[]
	): Promise<ReorderCategoryDto[]> {
		return categories.map(item => {
			if (!item.previousIndex) {
				throw new Error(
					`item.previousIndex is undefined in transformToReorderResult. categories = ${JSON.stringify(
						categories
					)}`
				)
			}

			return {
				categoryId: item._id.toString(),
				currentIndex: item.order,
				previousIndex: item.previousIndex
			}
		})
	}

	private async updateOrders(
		categories: ReorderCategoryDto[],
		userId: UserIdSession
	) {
		await Promise.all(
			categories.map(async item => {
				const updatedCategory = await this.categoryModel
					.findByIdAndUpdate(
						{ _id: item.categoryId, user: userId },
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
	async updateCategoryFields(): Promise<unknown> {
		const result = []

		/* Group */
		result.push({
			group: await this.categoryModel.updateMany(
				{ group: { $exists: false } },
				{ $set: { group: [] } }
			)
		})

		/* dimension */
		result.push({
			dimension: await this.categoryModel.updateMany(
				{ dimension: { $exists: false } },
				{ $set: { dimension: '' } }
			)
		})

		return result
	}
}
