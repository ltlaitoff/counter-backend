import { Response } from 'express'
import { HttpStatusCode } from '../../types'

/**
 * Used on user authorization
 */
export const authorizationError = (res: Response) => {
	return res
		.status(HttpStatusCode.UNAUTHORIZED)
		.json({ error: 'Authorization failed' })
}
