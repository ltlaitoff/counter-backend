import { Response, Request } from 'express'
import HttpStatusCode from '../../types/HttpStatusCode'
import { getUserById } from '../User/getUserById'

export const initialize = (req: Request, res: Response) => {
	if (!req.session.authorized || !req.session.userId) {
		return res.status(HttpStatusCode.OK).json({ authorized: false })
	}

	return getUserById(req.session.userId)
}
