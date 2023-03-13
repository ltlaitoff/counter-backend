import { Response } from 'express'
import { HttpStatusCode } from '../../types'

/**
 * Used on each request where the user unauthorized
 */
export const unauthorizedError = (res: Response) => {
	return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Unauthorized' })
}
