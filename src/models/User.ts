import { Schema, model } from 'mongoose'

const userSchema = new Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		key: { type: String, required: true }
	},
	{
		timestamps: true
	}
)

const User = model('User', userSchema)

export { User }
