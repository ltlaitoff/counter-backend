import { Request, Response, NextFunction } from 'express'
import { authorizationError } from '../services/authorizationError'

export const authorizationHeaderMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authorizationHeader = req.get('authorization')

	if (!authorizationHeader) return authorizationError(res)

	next()
}
