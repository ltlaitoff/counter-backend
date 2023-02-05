import { Response, Request } from 'express'
import HttpStatusCode from 'types/HttpStatusCode'
import { getUserById } from 'controllers/User'

export const initialize = async (req: Request, res: Response) => {
	if (!req.session.authorized || !req.session.userId) {
		return res.status(HttpStatusCode.OK).json({ authorized: false })
	}

	const user = await getUserById(req.session.userId)

	res.status(HttpStatusCode.OK).json({
		authorized: true,
		...user
	})
}
