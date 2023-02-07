import { Request, Response } from 'express'

import { getSessionUserId } from 'helpers'
import { Statistic } from 'models/Statistic'
import { unauthorizedError, somethingWentWrongError } from 'services'
import { HttpStatusCode } from 'types'

export const getByRecordIdRoute = (
	req: Request<{ recordId: string }>,
	res: Response
) => {
	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	const recordId = req.params.recordId

	return Statistic.findOne({ _id: recordId, user: userId }).exec(
		(error, value) => {
			if (error) {
				return somethingWentWrongError(res)
			}

			if (value === null) {
				return res.status(HttpStatusCode.NO_CONTENT).send('No content')
			}

			return res.status(HttpStatusCode.OK).json(value)
		}
	)
}
