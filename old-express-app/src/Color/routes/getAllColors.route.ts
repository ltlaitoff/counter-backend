import { Request, Response } from 'express'

import { somethingWentWrongError } from 'helpers'
import { HttpStatusCode } from 'types'
import { ColorServices } from '..'

export const getAllColorsRoute = async (req: Request, res: Response) => {
	try {
		const result = await ColorServices.findColors()

		return res.status(HttpStatusCode.OK).json(result)
	} catch {
		somethingWentWrongError(res)
	}
}
