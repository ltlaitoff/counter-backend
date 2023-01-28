import { Schema, model, ObjectId } from 'mongoose'

interface IUser {
	_id?: ObjectId
	name: string
	picture: string
	email: string
	email_verified: boolean
	given_name: string
	family_name: string
}

const userSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		picture: { type: String, required: true },
		email: { type: String, required: true },
		email_verified: { type: Boolean, required: true },
		given_name: { type: String, required: true },
		family_name: { type: String, required: true }
	},
	{
		timestamps: true
	}
)

const User = model('User', userSchema)

export { User, IUser }
