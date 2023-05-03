import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Color } from 'src/color/color.schema'
import { User } from 'src/user/user.schema'

@Schema()
export class Group {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	user: User

	@Prop({ required: true })
	name: string

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Color', required: true })
	color: Color

	@Prop({ required: true })
	order: number
}

export const GroupSchema = SchemaFactory.createForClass(Group)
