import express, { Express } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import cors from 'cors'
import session from 'express-session'

import router from './routes'

declare module 'express-session' {
	interface SessionData {
		authorized: boolean
		name: string
		email: string
	}
}

dotenv.config()

mongoose.set('strictQuery', true)

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@counterclaster.9imvrz0.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
	)
	.then(() => {
		console.log('[Server]: DB connected')
	})

	.catch(err => {
		console.error('[Server]: DB error connect', err)
	})

const store = new session.MemoryStore()
const app: Express = express()
const port = process.env.PORT

app.use(
	session({
		secret: 'keyboard cat',
		name: 'sessionId',
		resave: false,
		saveUninitialized: true,
		store
	})
)

app.use(
	cors({
		origin: 'http://localhost:4200',
		credentials: true
	})
)

app.use(router)

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
