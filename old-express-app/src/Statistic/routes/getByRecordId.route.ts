import { Request, Response } from 'express'

import { getSessionUserId } from 'helpers'
import { StatisticServices } from '..'
import { unauthorizedError } from 'helpers'
import { HttpStatusCode } from 'types'

export const getByRecordIdRoute = async (
	req: Request<{ recordId: string }>,
	res: Response
) => {
	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	const recordId = req.params.recordId

	const result = await StatisticServices.findRecord({
		_id: recordId,
		user: userId
	})

	if (result === null) {
		return res.status(HttpStatusCode.NO_CONTENT).send('No content')
	}

	return res.status(HttpStatusCode.OK).json(result)
}
