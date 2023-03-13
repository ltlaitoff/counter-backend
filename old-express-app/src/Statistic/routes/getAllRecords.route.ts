import { Request, Response } from 'express'

import { StatisticServices } from '..'

import { getSessionUserId } from 'helpers'
import { unauthorizedError } from 'helpers'
import { HttpStatusCode } from 'types'

export const getAllRecordsRoute = async (req: Request, res: Response) => {
	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	const result = await StatisticServices.findRecords({ user: userId })

	return res.status(HttpStatusCode.OK).json(result)
}
