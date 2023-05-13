import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

import { Color } from 'src/color/color.schema'
import { User } from 'src/user/user.schema'
import { Group } from 'src/category-group/category-group.schema'

@Schema()
export class Category {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	user: User

	@Prop({ required: true, default: 'number' })
	mode: 'number' | 'type'

	@Prop({ required: true })
	name: string

	@Prop()
	comment?: string

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Color', required: true })
	color: Color

	@Prop({ required: true })
	order: number

	@Prop()
	dimension?: string

	@Prop({
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Group',
		required: true,
		default: []
	})
	group: [Group]
}

export const CategorySchema = SchemaFactory.createForClass(Category)
