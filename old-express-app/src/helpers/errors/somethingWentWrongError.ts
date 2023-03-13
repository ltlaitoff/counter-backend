import { Response } from 'express'
import { HttpStatusCode } from '../../types'

export const somethingWentWrongError = (res: Response) => {
	return res
		.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
		.json({ error: 'Something Went Wrong' })
}
