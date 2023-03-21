import mongoose, { ObjectId } from 'mongoose'

declare module 'express-session' {
	interface SessionData {
		authorized: boolean
		userId: ObjectId | mongoose.Types.ObjectId
	}
}
