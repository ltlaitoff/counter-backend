import { Router, Response, Request } from 'express'

const debugRouter = Router()

debugRouter.get('/debug', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server')
})

export default debugRouter
