import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ColorsNames } from './color.interface'

@Schema()
export class Color {
	@Prop({ required: true })
	name: ColorsNames

	@Prop({ required: true })
	colorHEX: string

	@Prop({ required: true })
	order: number
}

export const ColorSchema = SchemaFactory.createForClass(Color)
