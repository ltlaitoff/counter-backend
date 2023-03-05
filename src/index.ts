import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose, { ObjectId } from 'mongoose'

import cors from 'cors'
import session from 'express-session'
import bodyParser from 'body-parser'
import router from './routes'
import { ColorHelpers } from 'Color'
import { serverDebugMessage } from 'utils/debugConsole.util'
import MongoStore from 'connect-mongo'
import fs from 'node:fs'
import https from 'node:https'
import { COOKIE_MAX_AGE } from './config'

/*
	TODO: Create middleware for print to console requests:
		[TYPE] User /../..
*/
declare module 'express-session' {
	interface SessionData {
		authorized: boolean
		userId: ObjectId
	}
}

dotenv.config()

mongoose.set('strictQuery', true)

const MONGO_CONNECT_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@counterclaster.9imvrz0.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`

mongoose
	.connect(MONGO_CONNECT_URL)
	.then(() => {
		serverDebugMessage('DB connected')
	})

	.catch(err => {
		serverDebugMessage('DB error connect', err)
	})

const app: Express = express()
const port = process.env.PORT
const store = MongoStore.create({
	mongoUrl: MONGO_CONNECT_URL
})

app.set('trust proxy', true)

const sessionConfig: session.SessionOptions = {
	proxy: true,
	secret: 'keyboard cat',
	name: 'sessionId',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: COOKIE_MAX_AGE,
		secure: true,
		httpOnly: true,
		sameSite: 'none'
	},
	store
}

app.use(session(sessionConfig))

app.use(
	cors({
		origin: [
			'http://localhost:4200',
			'https://localhost:4200',
			'https://ltlaitoff.github.io'
		],
		credentials: true
	})
)

app.use(bodyParser.json())

app.use((req: Request, res: Response, next: NextFunction) => {
	serverDebugMessage(`Store: ${JSON.stringify(store, null, 2)}`)

	next()
})

app.use(router)

const runCallback = () => {
	serverDebugMessage(`Server is running at https://localhost:${port}`)

	ColorHelpers.initializeDefaultColors()
}

const run = (app: Express, port: number, callback: () => void) => {
	if (process.env.NODE_ENV === 'production') {
		app.listen(port, callback)
		return
	}
	const key = fs.readFileSync(__dirname + '/../certs/selfsigned.key')
	const cert = fs.readFileSync(__dirname + '/../certs/selfsigned.crt')
	const options = {
		key: key,
		cert: cert
	}
	const server = https.createServer(options, app)
	server.listen(port, callback)
}

run(app, port, runCallback)
