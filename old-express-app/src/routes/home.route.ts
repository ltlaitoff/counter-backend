import { Router, Response, Request } from 'express'

const HomeRouter = Router()

HomeRouter.get('/', (req: Request, res: Response) => {
	res.status(200).json({ status: 'ok' })
})

export { HomeRouter }
