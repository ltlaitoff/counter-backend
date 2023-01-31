import { Request, Response } from 'express'

import { getSessionUserId } from 'helpers'
import { Statistic } from 'models/Statistic'
import { unauthorizedError, somethingWentWrongError } from 'services'
import HttpStatusCode from 'types/HttpStatusCode'

export const getAllRecordsRoute = (req: Request, res: Response) => {
	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	return Statistic.find({ user: userId }).exec((error, value) => {
		if (error) {
			return somethingWentWrongError(res)
		}

		return res.status(HttpStatusCode.OK).json(value)
	})
}
