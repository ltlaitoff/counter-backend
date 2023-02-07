import { Request, Response } from 'express'

import { Category } from 'models'

import { getSessionUserId } from 'helpers'
import { unauthorizedError } from 'helpers'

export const deleteCategoryRoute = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	const idForDelete = req.params.id

	if (!idForDelete) return

	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	Category.deleteOne(
		{
			_id: idForDelete,
			user: userId
		},
		error => {
			console.log('deleteCategoryRoute:', error)
			res.status(200).json(error)
		}
	)
}
