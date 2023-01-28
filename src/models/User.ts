import { Schema, model } from 'mongoose'

const userSchema = new Schema(
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

export { User }
