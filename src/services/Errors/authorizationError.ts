import { Response } from 'express'

export const authorizationError = (res: Response) => {
	return res.status(403).json({ error: 'No credentials sent!' })
}
