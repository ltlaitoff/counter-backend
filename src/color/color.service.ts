import { Body, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { DEFAULT_COLORS } from './color.config'
import { ColorsNames, IColor } from './color.interface'
import { Color } from './color.schema'
import { CreateColorDto } from './dto/create-color.dto'
import { UpdateColorDto } from './dto/update-color.dto'

@Injectable()
export class ColorService {
	config = {
		projection: `-__v -createdAt -updatedAt`
	}

	constructor(@InjectModel(Color.name) private colorModel: Model<IColor>) {}

	async create(@Body() createColorDto: CreateColorDto): Promise<IColor> {
		const newColor = await new this.colorModel(createColorDto)

		return newColor.save()
	}

	async update(
		colorId: string,
		updateColorDto: UpdateColorDto
	): Promise<IColor> {
		const existingColor = await this.colorModel.findByIdAndUpdate(
			colorId,
			updateColorDto,
			{ new: true }
		)

		if (!existingColor) {
			throw new Error(`Color #${colorId} not found`)
		}

		return existingColor
	}

	async find(data: Partial<Color>): Promise<IColor | null> {
		return await this.colorModel.findById(data, this.config.projection).lean()
	}

	async getAll(): Promise<IColor[]> {
		return await this.colorModel.find({}, this.config.projection).lean()
	}

	async delete(colorId: string) {
		const deletedColor = await this.colorModel.findByIdAndDelete(colorId)

		if (!deletedColor) {
			throw new Error(`Student #${colorId} not found`)
		}

		return deletedColor
	}

	/*
	TODO: Refactor all initialize-helpers methods
	*/
	async initializeDefaultColors() {
		const allColors = await this.getAll()

		this.createOrUpdateColors(allColors, DEFAULT_COLORS)
		this.removeUnUsedColors(allColors, DEFAULT_COLORS)
		this.removeDuplicates(allColors)

		const colorItems = await this.getAll()

		// TODO: Remove any type
		const resultObject: any = {}

		colorItems.forEach(item => {
			if (item._id) {
				resultObject[item.name] = item._id.toString()
			}
		})

		return resultObject as { [key in ColorsNames]: string }
	}

	private async createOrUpdateColors(all: IColor[], defaults: Color[]) {
		defaults.forEach(defaultColor => {
			const findedColor = all.find(color => {
				return (
					defaultColor.name === color.name ||
					defaultColor.colorHEX === color.colorHEX ||
					defaultColor.order === color.order
				)
			})

			if (findedColor === undefined) {
				this.create(defaultColor)
				return
			}

			if (
				findedColor.name !== defaultColor.name ||
				findedColor.colorHEX !== defaultColor.colorHEX ||
				findedColor.order !== defaultColor.order
			) {
				this.update(findedColor._id.toString(), defaultColor)
				return
			}
		})
	}

	private async removeUnUsedColors(all: IColor[], defaults: Color[]) {
		all.forEach(color => {
			const findedDefaultColor = defaults.find(defaultColor => {
				return (
					defaultColor.name === color.name ||
					defaultColor.colorHEX === color.colorHEX
				)
			})

			if (findedDefaultColor === undefined) {
				this.delete(color._id.toString())
				return
			}
		})
	}

	private async removeDuplicates(all: IColor[]) {
		const cache: Record<string, string> = {}

		const forDelete: IColor[] = []

		all.forEach(item => {
			if (item.name in cache) {
				forDelete.push(item)
				return
			}

			cache[item.name] = item.colorHEX
		})

		forDelete.forEach(color => {
			this.delete(color._id.toString())
		})
	}
}
