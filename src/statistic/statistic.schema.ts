import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

import { Category } from 'src/category/category.schema'
import { User } from 'src/user/user.schema'

@Schema()
export class Statistic {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	user: User

	@Prop({ required: true })
	date: Date

	@Prop({ required: true })
	count: number

	@Prop()
	comment: string

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	})
	category: Category

	@Prop({ required: true })
	summ: number
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic)
