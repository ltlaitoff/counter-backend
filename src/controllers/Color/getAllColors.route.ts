import { Request, Response } from 'express'

import { Color } from 'models/Color'
import { somethingWentWrongError } from 'helpers'

import { HttpStatusCode } from 'types'

export const getAllColorsRoute = (req: Request, res: Response) => {
	return Color.find({}, '-__v -createdAt -updatedAt').exec((error, value) => {
		if (error) {
			return somethingWentWrongError(res)
		}

		return res.status(HttpStatusCode.OK).json(value)
	})
}
