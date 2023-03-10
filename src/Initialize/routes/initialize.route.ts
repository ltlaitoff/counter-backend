import { Response, Request } from 'express'
import { HttpStatusCode } from 'types'
import { UserHelpers } from 'User'

export const initializeRoute = async (req: Request, res: Response) => {
	if (!req.session.authorized || !req.session.userId) {
		return res.status(HttpStatusCode.OK).json({ authorized: false })
	}

	const user = await UserHelpers.getUserById(req.session.userId)

	res.status(HttpStatusCode.OK).json({
		authorized: true,
		...user
	})
}
