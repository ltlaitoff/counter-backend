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

		// XXX: Remove populate after rework fronend
		await newCategoryDocument.populate('color', PROJECTIONS)

		return newCategoryDocument
	}

	async getAll(userId: UserIdSession): Promise<Category[]> {
		const userAllCategories = this.categoryModel.find(
			{ user: userId },
			PROJECTIONS
		)

		// XXX: Remove populate after rework fronend
		userAllCategories.populate('color', PROJECTIONS)

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

		// XXX: Remove populate after rework fronend
		await updatedCategoryDocument.populate('color', PROJECTIONS)

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
}
