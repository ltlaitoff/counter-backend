import mongoose from 'mongoose'

export type UserIdSession =
	| mongoose.Schema.Types.ObjectId
	| mongoose.Types.ObjectId

type SessionDataAuthorized = {
	authorized: true
	userId: UserIdSession
}

type SessionDataNotAuthorized = {
	authorized: undefined
	userId: undefined
}

type SessionDataAuth = SessionDataAuthorized | SessionDataNotAuthorized

declare module 'express-session' {
	interface SessionData {
		auth?: SessionDataAuth
	}
}
