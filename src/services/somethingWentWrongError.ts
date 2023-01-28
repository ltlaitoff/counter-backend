import { Response } from 'express'

export const somethingWentWrongError = (res: Response) => {
	return res.status(500).json({ error: 'something Went Wrong' })
}
