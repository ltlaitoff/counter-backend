import { Router, Response, Request } from 'express'

const HomeRouter = Router()

HomeRouter.get('/', (req: Request, res: Response) => {
	res.status(200).json({ status: 'ok' })
})

HomeRouter.post('/', (req: Request, res: Response) => {
	res.status(200).json({ status: 'post ok' })
})

export { HomeRouter }
