import { Request, Response } from 'express'

import { StatisticTypes, StatisticServices } from '..'
import {
	getSessionUserId,
	numberValidation,
	dateValidation,
	stringValidation
} from 'helpers'
import { unauthorizedError } from 'helpers'

type RecordBody = Omit<
	Omit<Omit<StatisticTypes.Statistic, 'user'>, '_id'>,
	'category'
> & {
	category: string
}

const recordBodyValidation = (body: Request['body']): null | RecordBody => {
	const count = body.count
	const comment = body.comment
	const date = body.date
	const category = body.category
	const summ = body.summ

	const resultCount = numberValidation(count)
	if (resultCount === null) return null

	const resultComment = stringValidation(comment)
	if (resultComment === null) return null

	const resultDate = dateValidation(date)
	if (resultDate === null) return null

	const resultCategory = stringValidation(category)
	if (resultCategory === null) return null

	const resultSumm = numberValidation(summ)
	if (resultSumm === null) return null

	return {
		count: resultCount,
		comment: resultComment,
		date: resultDate,
		category: resultCategory,
		summ: resultSumm
	}
}

export const addRecordRoute = async (req: Request, res: Response) => {
	const validBodyData = recordBodyValidation(req.body)

	if (validBodyData === null) {
		console.log('error recordBodyValidation')
		return res.status(404)
	}

	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	const createdRecord = await StatisticServices.createRecord({
		user: userId,
		...validBodyData
	} as StatisticTypes.CreateRecord)

	const findedRecord = await StatisticServices.findRecord({
		_id: String(createdRecord._id)
	})

	return res.status(200).json(findedRecord)
}
