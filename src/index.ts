import express, { Express } from 'express'
import dotenv from 'dotenv'
import mongoose, { ObjectId } from 'mongoose'

import cors from 'cors'
import session from 'express-session'
import bodyParser from 'body-parser'
import router from './routes'
import { ColorHelpers } from 'Color'
import { serverDebugMessage } from 'utils/debugConsole.util'
import MongoStore from 'connect-mongo'

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

const sessionConfig: session.SessionOptions = {
	secret: 'keyboard cat',
	name: 'sessionId',
	resave: false,
	saveUninitialized: true,
	cookie: {
		sameSite: false,
		secure: false
	},
	store: MongoStore.create({
		mongoUrl: MONGO_CONNECT_URL
	})
}

if (process.env.NODE_ENV === 'production') {
	app.set('trust proxy', 1)

	if (sessionConfig.cookie) {
		sessionConfig.cookie.sameSite = 'none'
	}

	if (sessionConfig.cookie) {
		sessionConfig.cookie.secure = true
	}
}

app.use(session(sessionConfig))

app.use(
	cors({
		origin: 'http://localhost:4200',
		credentials: true
	})
)

app.use(bodyParser.json())

app.use(router)

app.listen(port, () => {
	serverDebugMessage(`Server is running at http://localhost:${port}`)

	ColorHelpers.initializeDefaultColors()
})
