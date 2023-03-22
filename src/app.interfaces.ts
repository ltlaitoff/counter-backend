import mongoose, { ObjectId } from 'mongoose'

type SessionDataAuthorized = {
	authorized: true
	userId: ObjectId | mongoose.Types.ObjectId
}

type SessionDataNotAuthorized = {
	authorized: undefined
	userId: undefined
}

type SessionDataAuth = SessionDataAuthorized | SessionDataNotAuthorized

declare module 'express-session' {
	interface SessionData {
		auth: SessionDataAuth
	}
}
