import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class User {
	@Prop({ required: true })
	name: string

	@Prop({ required: true })
	picture: string

	@Prop({ required: true })
	email: string

	@Prop({ required: true })
	email_verified: boolean

	@Prop({ required: true })
	given_name: string

	@Prop({ required: true })
	family_name: string
}

export const UserSchema = SchemaFactory.createForClass(User)
