import { Request, Response } from 'express'

import { getSessionUserId } from 'helpers'
import { Category } from 'models/Category'
import { unauthorizedError, somethingWentWrongError } from 'services'
import HttpStatusCode from 'types/HttpStatusCode'

export const getAllCategoriesRoute = (req: Request, res: Response) => {
	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	return Category.find({ user: userId }, '-__v -createdAt -updatedAt')
		.populate('color', '-_id -__v -createdAt -updatedAt')
		.exec((error, value) => {
			if (error) {
				return somethingWentWrongError(res)
			}

			return res.status(HttpStatusCode.OK).json(value)
		})
}
