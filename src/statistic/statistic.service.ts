import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserIdSession } from 'src/app.interfaces'
import { CreateStatisticDto } from './dto/create-statistic.dto'
import { UpdateStatisticDto } from './dto/update-statistic.dto'
import { PROJECTIONS } from './statistic.config'
import { IStatistic } from './statistic.interface'
import { Statistic } from './statistic.schema'

@Injectable()
export class StatisticService {
	constructor(
		@InjectModel(Statistic.name) private statisticModel: Model<IStatistic>
	) {}

	async getAll(userId: UserIdSession) {
		const userAllStastistic = this.statisticModel
			.find({ user: userId }, PROJECTIONS)
			.lean()

		// XXX: Remove populate after rework frontend
		userAllStastistic.populate({
			path: 'category',
			populate: { path: 'color' }
		})

		return await userAllStastistic.lean()
	}

	async getById(id: string, userId: UserIdSession) {
		return await this.statisticModel
			.find({ _id: id, user: userId }, PROJECTIONS)
			.lean()
	}

	async add(body: CreateStatisticDto, userId: UserIdSession) {
		const dataForAdd = {
			user: userId,
			date: body.date,
			count: body.count,
			comment: body.comment,
			category: body.category,
			summ: body.summ
		}

		const newStatistic = await new this.statisticModel(dataForAdd)

		const newStatisticDocument = await newStatistic.save()

		// XXX: Remove populate after rework fronend
		await newStatisticDocument.populate({
			path: 'category',
			populate: { path: 'color' }
		})

		return newStatisticDocument
	}

	async delete(id: string, userId: UserIdSession): Promise<unknown> {
		return await this.statisticModel.deleteOne({
			_id: id,
			user: userId
		})
	}

	async edit(id: string, body: UpdateStatisticDto, userId: UserIdSession) {
		const updatedStatistic = await this.statisticModel.findByIdAndUpdate(
			{ _id: id, user: userId },
			body,
			{ new: true }
		)

		if (!updatedStatistic) {
			return null
		}

		const updatedStatisticDocument = await updatedStatistic.save()

		// XXX: Remove populate after rework fronend
		await updatedStatisticDocument.populate({
			path: 'category',
			populate: { path: 'color' }
		})

		return updatedStatisticDocument
	}
}
