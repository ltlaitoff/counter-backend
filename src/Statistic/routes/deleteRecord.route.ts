import { Request, Response } from 'express'

import { StatisticServices } from '..'

import { getSessionUserId } from 'helpers'
import { unauthorizedError } from 'helpers'
import { HttpStatusCode } from 'types'

export const deleteRecordRoute = async (req: Request, res: Response) => {
	const idForDelete = req.params.id

	if (!idForDelete) return

	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	const result = await StatisticServices.deleteRecord({
		user: userId,
		_id: idForDelete
	})

	return res.status(HttpStatusCode.OK).json(result)
}
