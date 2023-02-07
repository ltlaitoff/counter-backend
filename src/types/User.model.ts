import { ObjectId } from 'mongoose'

export interface IUser {
	_id?: ObjectId
	name: string
	picture: string
	email: string
	email_verified: boolean
	given_name: string
	family_name: string
}
