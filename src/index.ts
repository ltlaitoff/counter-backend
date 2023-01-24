import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { connect } from 'mongoose'

dotenv.config()

connect(
	`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@counterclaster.9imvrz0.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
)
	.then(() => {
		console.log('[Server]: DB connected')
	})

	.catch(err => {
		console.error('[Server]: DB error connect', err)
	})

const app: Express = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server')
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
