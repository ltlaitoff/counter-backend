import { Response } from 'express'
import HttpStatusCode from '../../types/HttpStatusCode'

export const authorizationError = (res: Response) => {
	return res
		.status(HttpStatusCode.UNAUTHORIZED)
		.json({ error: 'No credentials sent!' })
}
