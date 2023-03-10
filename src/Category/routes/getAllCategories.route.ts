import { Request, Response } from 'express'

import { getSessionUserId } from 'helpers'
import { CategoryModel } from '..'
import { unauthorizedError, somethingWentWrongError } from 'helpers'
import { HttpStatusCode } from 'types'

export const getAllCategoriesRoute = (req: Request, res: Response) => {
	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	return CategoryModel.find({ user: userId }, '-__v -createdAt -updatedAt')
		.populate('color', '-__v -createdAt -updatedAt')
		.exec((error, value) => {
			if (error) {
				return somethingWentWrongError(res)
			}

			return res.status(HttpStatusCode.OK).json(value)
		})
}
