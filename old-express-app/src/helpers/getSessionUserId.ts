import { Request } from 'express'

export const getSessionUserId = (session: Request['session']) => {
	const userId = session.userId

	if (userId === undefined) return null

	return userId
}
