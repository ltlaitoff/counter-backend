import { Request, Response } from 'express'

import { getSessionUserId } from 'helpers'
import { Statistic } from 'models/Statistic'
import { unauthorizedError, somethingWentWrongError } from 'helpers'
import { HttpStatusCode } from 'types'

export const getAllRecordsRoute = (req: Request, res: Response) => {
	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	return Statistic.find({ user: userId })
		.populate({
			path: 'category',
			populate: { path: 'color' }
		})
		.exec((error, value) => {
			if (error) {
				console.log(error)
				return somethingWentWrongError(res)
			}

			return res.status(HttpStatusCode.OK).json(value)
		})
}
