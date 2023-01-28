import { Response, Request } from 'express'
import { getUserById } from '../User/getUserById'

export const initialize = (req: Request, res: Response) => {
	if (!req.session.authorized || !req.session.userId) {
		return res.status(200).json({ authorized: false })
	}

	return getUserById(req.session.userId)
}
