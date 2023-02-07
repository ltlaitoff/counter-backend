import { Request, Response } from 'express'

import { IStatistic } from 'types'
import {
	getSessionUserId,
	numberValidation,
	dateValidation,
	stringValidation
} from 'helpers'
import { unauthorizedError } from 'services'
import { Statistic } from 'models'

type RecordBody = Omit<Omit<Omit<IStatistic, 'user'>, '_id'>, 'category'> & {
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

export const addRecordRoute = (req: Request, res: Response) => {
	// TODO: Connect bodyparser

	console.log(
		'%caddRecord.route.ts line:83 rer.body',
		'color: #007acc;',
		req.body
	)

	const validBodyData = recordBodyValidation(req.body)

	console.log(
		'%caddRecord.route.ts line:105 validBodyData',
		'color: #007acc;',
		validBodyData
	)

	if (validBodyData === null) {
		console.log('error recordBodyValidation')
		// TODO
		return res.status(404)
	}

	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	Statistic.create({ user: userId, ...validBodyData }, (error, document) => {
		console.log(error, document)
	})
}
